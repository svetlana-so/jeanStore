import React from 'react'
import { fetchProductById } from '@/app/lib/data';
import ProductDetail from '@/app/ui/products/productDetails';

export default async function Page ({ params }: { params: { id: string } }) {

    const id = params.id;
    const product = await fetchProductById(id);

  return (
    //@ts-ignore
    <ProductDetail product={product}/>
  )
}
