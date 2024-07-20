/* eslint-disable @next/next/no-img-element */
"use client"
import {useState} from 'react';
import {Image} from '@/app/lib/definitions'

import { ProductWithImage } from '@/app/lib/definitions';
import { useRouter } from 'next/navigation';

type ProductDetailProps = {
    product: ProductWithImage;
    
  };

export default function ProductDetail ({ product } : ProductDetailProps) {
    const router = useRouter()
    const [selectedImage, setSelectedImage] = useState(product.images[0]);
    const handleImageClick = (image: Image) => {
        setSelectedImage(image);
      };

  return (
    <div className="p-8 bg-white">
      <button onClick={() => router.push('/') } className="text-black font-bold">&larr; BACK</button>
      <div className="flex flex-col lg:flex-row gap-8 mt-4 justify-between">
        <div className="flex flex-col">     
<div className='flex flex-row items-center'>
<div className="flex flex-col gap-2 mt-2">
            {product.images.map((image) => (
              <img
              onClick={() => handleImageClick(image)}
                key={image.id}
                src={image.url}
                alt={image.url}
                className="w-20 h-20 object-cover cursor-pointer"
              />
            ))}
          </div>
          <div className="ml-4 max-w-80 w-">
          <img
            src={selectedImage.url}
            alt={`Selected image of ${product.brand}`}
            className="object-cover"
          />
        </div>
</div>
          
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{product.brand}</h1>
          <span className="text-xl text-gray-500">{product.price}</span>
          
          <div className="flex gap-4 mt-4">
            <button className="bg-black text-white p-4 rounded">ADD TO BAG</button>
            <button className="border border-gray-300 p-4 rounded">FAVORITE</button>
          </div>
          <div className="flex gap-4 mt-4">
            <span>SHIPPING*</span>
            <span>FREE PICKUP</span>
          </div>
        </div>
      </div>
    </div>
  );
};


