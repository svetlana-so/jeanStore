import { fetchProductsPages } from "./lib/data";
import { Suspense } from 'react';
import AllJeansList from "./ui/home/all-jeans-list";
import Loading from "./ui/skeletons";
import Pagination from "./ui/products/pagination";

export default async function Home({searchParams}: {
  searchParams?: {
    query?: string,
    page?: string
  }
}) {

  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchProductsPages(query);


  return (

    
    <main>
      <Suspense  fallback={<Loading/>}>
        <AllJeansList />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
      <Pagination totalPages={totalPages} />
      </div>
    </main>
  );
}
