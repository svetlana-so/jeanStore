import React from 'react'
import { fetchProducts, fetchFilteredProducts } from '@/app/lib/data'
import { Card } from './card';

interface JeansListProps {
    query: string,
    currentPage: number
}

export default async function JeansList ({query, currentPage}: JeansListProps) {

const products = await fetchFilteredProducts(query, currentPage);

  return (
    <div className="m-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 justify-center">
        {products.map(product => (
            <Card key={product.id} product={product}/>
          ))}
    </div>
  )
}
