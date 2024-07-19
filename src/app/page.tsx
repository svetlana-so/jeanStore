import { Suspense } from 'react';
import AllJeansList from './ui/home/all-jeans-list';
import Loading from './ui/skeletons';
import NavBar from './ui/home/nav-bar';
import { fetchProducts } from '@/app/lib/data';
import { TbMoodEmpty } from "react-icons/tb";

export default async function Home() {
  const products = await fetchProducts();
  const basePath = '/';

 

  return (
    <main>
      <div className="w-full flex-none p-4">
        <NavBar />
      </div>
      <Suspense fallback={<Loading />}>
      {products.length === 0 ? (
          <div className='flex flex-row justify-center items-center gap-4 m-8'>
            <h1>No products</h1>
            <TbMoodEmpty />
          </div>
        ) : (
          <AllJeansList products={products} basePath={basePath} />
        )}
      </Suspense>
      <div className="mt-5 flex w-full justify-center"></div>
    </main>
  );
}
