import React from 'react'
import { ProductWithImage } from '@/app/lib/definitions';

type CardProps = {
    product: ProductWithImage;
  };

export const Card: React.FC<CardProps> = ({product}) => {
  return (
    <div key={product.id} className="p-4 border border-gray-200 rounded-md">
              <h2 className="font-bold">{product.brand}</h2>
              <div className="grid gap-2">
                {product.images.map((image) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={image.id} src={image.url} alt={`Image of ${product.brand}`} className="w-full h-auto object-cover"/>
                ))}
              </div>
            </div>
  )
}
