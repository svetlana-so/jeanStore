'use client';
import React from 'react';
import { Card } from '@/app/ui/products/card';

import type { ProductWithImage } from '../../lib/definitions';
import { useRouter } from 'next/navigation';

type AllJeansListProps = {
  products: ProductWithImage[];
  basePath: string;
};

export default function AllJeansList({
  products,
  basePath,
}: AllJeansListProps) {
  const router = useRouter();

  const handleCardClick = (id: string) => {
    router.push(`${basePath}/${id}`);
  };
  return (
    <div className="m-4 grid cursor-pointer justify-center gap-4 sm:grid-cols-2 lg:grid-cols-6">
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
