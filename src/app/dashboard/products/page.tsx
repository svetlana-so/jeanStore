import { fetchProducts } from '@/app/lib/data';
import AllJeansList from '@/app/ui/home/all-jeans-list';

export default async function Page() {
  const products = await fetchProducts();
  const basePath = '/dashboard/products/';

  if(products.length === 0) return ( <div className='flex justify-center m-4'> No products</div>)

  return (
    <>
  <h1 className='m-4 font-thin'>Total products: {products.length}</h1>
  <AllJeansList products={products} basePath={basePath} />
  </>)
}
