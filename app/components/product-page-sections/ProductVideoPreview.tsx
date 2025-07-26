/** @format */

import React from 'react';

export default function ProductVideoPreview() {
  return (
    <div className="max-w-7xl hidden md:block mx-auto px-4">
      <div className="h-[80vh]​ w-full flex justify-center items-center relative rounded-md overflow-hidden ">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover rounded-md"
        >
          <source
            src="https://res.cloudinary.com/vccpsacloud/video/upload/v1744904277/dzq60wvulaf7xrbzsjs7.mp4"
            type="video/mp4"
          />
        </video>
        {/* Decription container with gradient */}
        <div className="flex flex-col justify-center w-full h-[25%] bg-gradient-to-t from-black to-black/0 absolute bottom-0 p-10">
          <p className="text-2xl text-white">Flattering silhouette </p>
          <p className="text-xl text-white">with a modern, timeless design</p>
        </div>
      </div>
    </div>
  );
}
