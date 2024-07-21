'use client';
import React from 'react';
import { Card } from './card';
import { ProductWithImage } from '@/app/lib/definitions';
import { useRouter } from 'next/navigation';

interface JeansListProps {
  products: ProductWithImage[];
  basePath: string;
}

export default function JeansList({ products, basePath }: JeansListProps) {
  const router = useRouter();

  const handleCardClick = (id: string) => {
    router.push(`${basePath}/${id}`);
  };
  return (
    <div className="my-4 grid cursor-pointer justify-center gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product) => (
        <Card
          key={product.id}
          product={product}
          onClick={() => handleCardClick(product.id)}
        />
      ))}
    </div>
  );
}
