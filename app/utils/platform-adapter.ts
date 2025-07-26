// Check for various serverless environments
export const IS_CF_PAGES = typeof process === 'undefined';
export const IS_VERCEL = typeof process !== 'undefined' && Boolean(process.env.VERCEL);
export const IS_NETLIFY = typeof process !== 'undefined' && Boolean(process.env.NETLIFY);
export const IS_SERVERLESS = IS_CF_PAGES || IS_VERCEL || IS_NETLIFY;

// This hack is to prevent `node` modules/packages being bundled in the
// Cloudflare Pages context, which causes an error.
export async function safeRequireNodeDependency(module: string) {
  return import(module.split('').join(''));
}
