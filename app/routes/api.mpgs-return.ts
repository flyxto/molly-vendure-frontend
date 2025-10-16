// Create this file: app/routes/api.mpgs-return.ts

import { ActionFunctionArgs, json } from '@remix-run/node';

const VENDURE_SHOP_API_URL =
  process.env.VENDURE_API_URL || 'http://localhost:3000/shop-api';

export async function action({ request }: ActionFunctionArgs) {
  //console.log('🔵 MPGS Return API called');

  try {
    const body = await request.json();
    const { orderCode, resultIndicator } = body;

    //console.log('📦 Request body:', { orderCode, resultIndicator });

    if (!orderCode || !resultIndicator) {
      //console.error('❌ Missing required parameters');
      return json(
        { success: false, message: 'Missing orderCode or resultIndicator' },
        { status: 400 },
      );
    }

    // Get auth token from vendure_remix_session cookie
    const cookieHeader = request.headers.get('Cookie') || '';

    // Parse vendure_remix_session cookie
    const vendureSessionMatch = cookieHeader.match(
      /vendure_remix_session=([^;]+)/,
    );
    let authToken = '';

    if (vendureSessionMatch) {
      try {
        // Decode the URL-encoded cookie value
        const decodedSession = decodeURIComponent(vendureSessionMatch[1]);
        // Parse the base64 JSON
        const sessionJson = Buffer.from(decodedSession, 'base64').toString(
          'utf-8',
        );
        const sessionData = JSON.parse(sessionJson);
        authToken = sessionData.authToken;
        //console.log('🔑 Extracted auth token from vendure_remix_session');
      } catch (e) {
        console.error('❌ Failed to parse vendure_remix_session:', e);
      }
    }

    //console.log('🔑 Auth token:', authToken ? 'Present (' + authToken.substring(0, 10) + '...)' : 'Missing');
    //console.log('🌐 Calling Vendure API:', VENDURE_SHOP_API_URL);

    // Call Vendure API with the auth token
    const response = await fetch(VENDURE_SHOP_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(authToken ? { 'vendure-token': authToken } : {}),
      },
      body: JSON.stringify({
        query: `
          mutation HandleMpgsReturn($orderCode: String!, $resultIndicator: String!) {
            handleMpgsReturn(orderCode: $orderCode, resultIndicator: $resultIndicator) {
              success
              orderState
              message
            }
          }
        `,
        variables: {
          orderCode,
          resultIndicator,
        },
      }),
    });

    const data = await response.json();

    //console.log('📨 Vendure API response status:', response.status);
    //console.log('📨 Vendure API response data:', JSON.stringify(data, null, 2));

    if (data.errors) {
      console.error('❌ GraphQL Errors:', data.errors);
      return json(
        {
          success: false,
          message: data.errors[0].message,
          orderState: 'Unknown',
          errors: data.errors,
        },
        { status: 400 },
      );
    }

    if (!data.data || !data.data.handleMpgsReturn) {
      console.error('❌ No data in response');
      return json(
        {
          success: false,
          message: 'Invalid response from server',
          orderState: 'Unknown',
        },
        { status: 500 },
      );
    }

    //console.log('✅ Success! Result:', data.data.handleMpgsReturn);

    return json(data.data.handleMpgsReturn);
  } catch (error) {
    console.error('❌ Error in MPGS return handler:', error);
    return json(
      {
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error',
        orderState: 'Unknown',
      },
      { status: 500 },
    );
  }
}
