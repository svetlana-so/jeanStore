/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
'use client';
import React from 'react';
import { ProductWithImage } from '@/app/lib/definitions';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

type CardProps = {
  product: ProductWithImage;
};

export const Card: React.FC<CardProps> = ({ product }) => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-bold">{product.brand}</h2>
      <Carousel>
        {product.images.map((image) => (
          <div key={image.id} className='flex flex-col gap-2'>
            <img
          src={image.url}
          alt={`Image of ${product.brand}`}
          className="h-auto w-full object-cover"
        />
        <p className=' flex text-start'>SEK {product.price}</p>
        </div>
        ))}
      </Carousel>
    </div>
  );
};
