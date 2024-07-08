import React from 'react'
import { fetchProducts } from '@/app/lib/data'
import { Card } from '@/app/ui/products/card';

interface JeansListProps {
    category: string,
    currentPage: number
}

export default async function AllJeansList () {

const products = await fetchProducts();

  return (
    <div className="m-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-6 justify-center">
        {products.map(product => (
            <Card key={product.id} product={product}/>
          ))}
    </div>
  )
}
