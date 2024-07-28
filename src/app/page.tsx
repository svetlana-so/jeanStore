import { Suspense } from 'react';
import AllJeansList from './ui/home/all-jeans-list';
import Loading from './ui/skeletons';
import NavBar from './ui/home/nav-bar';
import { fetchProducts } from '@/app/lib/data';
import { TbMoodEmpty } from 'react-icons/tb';
import { Filter } from './ui/products/filter';
import { fetchAllAttributes } from '@/app/lib/data';


export default async function Home() {
  const products = await fetchProducts();
  const basePath = '/products';
  const {
    categories,
    sizes,
    colors,
    brands,
    sizeWaist,
    sizeLength,
    materials,
    stretches,
    measurementHip,
    measurementFrontCrotch,
    measurementBackCrotch,
    measurementThigh,
    measurementInseam,
  } = await fetchAllAttributes();
  
  return (
    <main>
      <div className="w-full flex-none p-4">
        <NavBar />
      </div>
      <Suspense fallback={<Loading />}>
        {products.length === 0 ? (
          <div className="m-8 flex flex-row items-center justify-center gap-4">
            <h1>No products</h1>
            <TbMoodEmpty />
          </div>
        ) : (
          <>
            <h3 className="text-center font-semibold">All Products</h3>
            <div className="mx-4">
            <Filter
            categories={categories}
            sizes={sizes}
            colors={colors}
            brands={brands}
            sizeWaist={sizeWaist}
            sizeLength={sizeLength}
            materials={materials}
            stretches={stretches}
            measurementHip={measurementHip}
            measurementFrontCrotch={measurementFrontCrotch}
            measurementBackCrotch={measurementBackCrotch}
            measurementThigh={measurementThigh}
            measurementInseam={measurementInseam}/>
            </div>
           
            <AllJeansList products={products} basePath={basePath} />
          </>
        )}
      </Suspense>
      <div className="mt-5 flex w-full justify-center"></div>
    </main>
  );
}


