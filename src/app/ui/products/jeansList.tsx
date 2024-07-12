import React from 'react';
import { Card } from './card';
import { ProductWithImage } from '@/app/lib/definitions';

interface JeansListProps {
  products: ProductWithImage[];
}

export default function JeansList({ products }: JeansListProps) {
  return (
    <div className="my-4 grid justify-center gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product) => (
        <Card key={product.id} product={product} />
      ))}
    </div>
  );
}
