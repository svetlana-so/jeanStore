import React from 'react';
import { fetchProductById } from '@/app/lib/data';
import ProductDetail from '@/app/ui/products/productDetails';
import NavBar from '@/app/ui/home/nav-bar';

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const product = await fetchProductById(id);

  return (
    <>
      <div className="w-full flex-none p-4">
        <NavBar />
      </div>

      <ProductDetail
        //@ts-ignore
        product={product}
      />
    </>
  );
}
