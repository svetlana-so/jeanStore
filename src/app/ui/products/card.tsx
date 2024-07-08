'use client'
import React from 'react'
import { ProductWithImage } from '@/app/lib/definitions';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 

type CardProps = {
    product: ProductWithImage;
  };

export const Card: React.FC<CardProps> = ({product}) => {
  return (
    <div className='flex flex-col gap-4'>
    <h2 className="font-bold">{product.brand}</h2>
    <Carousel >
                {product.images.map((image) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={image.id} src={image.url} alt={`Image of ${product.brand}`} className="w-full h-auto object-cover"/>
                ))}
          </Carousel>
      </div>
  )
}
