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

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
      };

  return (
    <div className="p-8 bg-white ">
      <button onClick={() => router.push('/') } className="text-black font-bold">&larr; BACK</button>
      <div className="flex flex-col md:flex-row gap-8 mt-4">
        <div className="flex flex-col">     
<div className='flex flex-col-reverse md:flex-row items-center'>
<div className="flex flex-row md:flex-col gap-2 mt-2">
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
        <div className="flex flex-col gap-4 ">
          <h1 className="text-3xl font-bold">{product.brand}</h1>
          <div>
            <span className="text-xl text-gray-500">{product.price}</span>
          </div>
          <div>
            <h1 className="text-lg font-bold">Size</h1>
            <span>{product.size_label}</span>
          </div>
          <div>
            <h1 className="text-lg font-bold">Color</h1>
            <span>{product.color}</span>
          </div>
          <div className="border-t border-b border-gray-300 py-2">
        <button
          onClick={toggleDropdown}
          className="w-full flex justify-between items-center text-left font-bold dark:text-gray-200"
        >
          Description
          <span>{isDropdownOpen ? '▲' : '▼'}</span>
        </button>
        {isDropdownOpen && (
          <div className="mt-2 p-2 dark:text-gray-200 flex flex-col gap-4">
            <p><strong>Size Waist:</strong> {product.size_waist}</p>
            <p><strong>Size Length:</strong> {product.size_length}</p>
            <p><strong>Fit:</strong> {product.fit}</p>
            <p><strong>Material:</strong> {product.material}</p>
            <p><strong>Stretch:</strong> {product.stretch}</p>
            <p><strong>Hip Measurement:</strong> {product.measurement_hip}</p>
            <p><strong>Front Crotch Measurement:</strong> {product.measurement_front_crotch}</p>
            <p><strong>Back Crotch Measurement:</strong> {product.measurement_back_crotch}</p>
            <p><strong>Thigh Measurement:</strong> {product.measurement_thigh}</p>
            <p><strong>Inseam Measurement:</strong> {product.measurement_inseam}</p>
          </div>
        )}
      </div>
     
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


