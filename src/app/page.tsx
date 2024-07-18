import { Suspense } from 'react';
import AllJeansList from './ui/home/all-jeans-list';
import Loading from './ui/skeletons';
import NavBar from './ui/home/nav-bar';
import { fetchProducts } from '@/app/lib/data';

export default async function Home() {
  const products = await fetchProducts();
  return (
    <main>
      <div className="w-full flex-none p-4">
        <NavBar />
      </div>
      <Suspense fallback={<Loading />}>
        <AllJeansList products={products}/>
      </Suspense>
      <div className="mt-5 flex w-full justify-center"></div>
    </main>
  );
}
