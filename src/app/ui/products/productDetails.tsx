/* eslint-disable @next/next/no-img-element */
'use client';

import { useState } from 'react';
import { Image } from '@/app/lib/definitions';

import { ProductWithImage } from '@/app/lib/definitions';
import { useRouter } from 'next/navigation';
import BackBtn from '../backBtn';

type ProductDetailProps = {
  product: ProductWithImage;
};

export default function ProductDetail({ product }: ProductDetailProps) {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const handleImageClick = (image: Image) => {
    setSelectedImage(image);
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const pathName = '/'

  return (
    <div className="p-8">
      <BackBtn path={pathName}/>
    
      <div className="mt-4 flex flex-col gap-8 md:flex-row">
        <div className="flex flex-col">
          <div className="flex flex-col-reverse items-center md:flex-row">
            <div className="mt-2 flex flex-row gap-2 md:flex-col">
              {product.images.map((image) => (
                <img
                  onClick={() => handleImageClick(image)}
                  key={image.id}
                  src={image.url}
                  alt={image.url}
                  className="h-20 w-20 cursor-pointer object-cover"
                />
              ))}
            </div>
            <div className="ml-4 max-w-96">
              <img
                src={selectedImage.url}
                alt={`Selected image of ${product.brand}`}
                className="object-cover"
              />
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col gap-4 md:w-1/3">
          <h1 data-testid="brandName" className="text-3xl font-bold">{product.brand}</h1>
          <div>
            <span data-testid="price" className="text-xl text-gray-500">{product.price} SEK</span>
          </div>
          <div>
            <h1 className="text-lg font-bold">Size</h1>
            <span data-testid="size">{product.size_label}</span>
          </div>
          <div>
            <h1 className="text-lg font-bold">Color</h1>
            <span data-testid="color" >{product.color}</span>
          </div>
          <div className="border-b border-t border-gray-300 py-2">
            <button
            data-testid="descriptionBtn" 
              onClick={toggleDropdown}
              className="flex w-full items-center justify-between text-left font-bold dark:text-gray-200"
            >
              Description
              <span>{isDropdownOpen ? '▲' : '▼'}</span>
            </button>
            {isDropdownOpen && (
              <div data-testid="productDescription" className="mt-2 flex flex-col gap-4 p-2 dark:text-gray-200">
                <p>
                  <strong>Size Waist:</strong> {product.size_waist}
                </p>
                <p>
                  <strong>Size Length:</strong> {product.size_length}
                </p>
                <p>
                  <strong>Fit:</strong> {product.fit}
                </p>
                <p>
                  <strong>Material:</strong> {product.material}
                </p>
                <p>
                  <strong>Stretch:</strong> {product.stretch}
                </p>
                <p>
                  <strong>Hip Measurement:</strong> {product.measurement_hip}
                </p>
                <p>
                  <strong>Front Crotch Measurement:</strong>{' '}
                  {product.measurement_front_crotch}
                </p>
                <p>
                  <strong>Back Crotch Measurement:</strong>{' '}
                  {product.measurement_back_crotch}
                </p>
                <p>
                  <strong>Thigh Measurement:</strong>{' '}
                  {product.measurement_thigh}
                </p>
                <p>
                  <strong>Inseam Measurement:</strong>{' '}
                  {product.measurement_inseam}
                </p>
              </div>
            )}
          </div>

          <div className="mt-4 flex gap-4">
            <button className="rounded bg-black p-4 text-white hover:bg-orange-400">
              ADD TO BAG
            </button>
            <button className="rounded border border-gray-300 p-4 hover:bg-red-300">
              FAVORITE
            </button>
          </div>
          <div className="mt-4 flex gap-4">
            <span>SHIPPING*</span>
            <span>FREE PICKUP</span>
          </div>
        </div>
      </div>
    </div>
  );
}
