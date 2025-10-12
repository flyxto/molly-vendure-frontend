/** @format */

'use client';

import { CardBody, CardContainer, CardItem } from 'components/ui/3d-card';

export function ThreeDCardDemo({ images, paragraphs }: any) {
  // Check if images array is valid and has at least 3 items
  const isValidImageArray = Array.isArray(images) && images.length >= 3;

  // Check if paragraphs object is valid and has the expected properties
  const isValidParagraphs =
    paragraphs &&
    typeof paragraphs === 'object' &&
    'topLeft' in paragraphs &&
    'bottomRight' in paragraphs;

  // For debugging
  // console.log('Received images:', images);
  // console.log('Received paragraphs:', paragraphs);

  return (
    <CardContainer className="inter-var">
      <CardBody className="relative group/card w-auto sm:w-[40rem] sm:h-[50rem] h-auto rounded-xl p-6 justify-center items-center flex flex-col">
        <CardItem
          translateZ="20"
          className="justify-center items-center flex absolute left-10 top-32 z-20"
        >
          <p className="text-justify uppercase leading-tight text-xs max-w-xs">
            {isValidParagraphs
              ? paragraphs.topLeft
              : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam'}
          </p>
        </CardItem>
        <CardItem
          translateZ="50"
          className="justify-center items-center flex absolute rounded-xl left-0 bottom-0 z-20 border-l-8 border border-gray-200 bg-white"
        >
          <img
            src={
              isValidImageArray
                ? images[0]
                : '/Images/home-page/new_arrivals-img_3.png'
            }
            height="500"
            width="500"
            className="h-[20rem] w-fit object-cover rounded-xl group-hover/card:shadow-2xl transition"
            alt="thumbnail"
          />
        </CardItem>
        <CardItem
          translateZ="0"
          className=" justify-center items-center rounded-xl flex mt-4 w-96  border border-gray-200 bg-white"
        >
          <img
            src={
              isValidImageArray
                ? images[1]
                : '/Images/home-page/new_arrivals-img_3.png'
            }
            height="500"
            width="500"
            className="h-[40rem] w-fit object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
        <CardItem
          translateZ="50"
          className="justify-center items-center flex absolute rounded-xl right-0 top-0  border border-gray-200 bg-white"
        >
          <img
            src={
              isValidImageArray
                ? images[2]
                : '/Images/home-page/new_arrivals-img_3.png'
            }
            height="500"
            width="500"
            className="h-[20rem] w-fit object-cover rounded-xl group-hover/card:shadow-2xl transition"
            alt="thumbnail"
          />
        </CardItem>
        <CardItem
          translateZ="20"
          className="justify-center items-center flex absolute right-10 bottom-10"
        >
          <p className="text-justify uppercase leading-tight text-xs max-w-xs">
            {isValidParagraphs
              ? paragraphs.bottomRight
              : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam'}
          </p>
        </CardItem>
      </CardBody>
    </CardContainer>
  );
}
