/** @format */

import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function ProductViewSeperator() {
  return (
    <div className="w-full hidden md:block bg-[#F3EBE0] py-10">
      <div className="max-w-7xl px-4 mx-auto flex justify-between">
        <p className="w-lg uppercase text-4xl flex flex-wrap">
          Step into style with{' '}
          <span>
            <ArrowRight className="w-10 h-10 ml-12" />
          </span>{' '}
          our chic women's dress
        </p>
        <p className="max-w-sm">
          Elevate your style with this chic and elegant dress! Featuring a
          flattering fit and modern design, it&apos;s perfect for any occasion.
          Shop now!
        </p>
      </div>
    </div>
  );
}
