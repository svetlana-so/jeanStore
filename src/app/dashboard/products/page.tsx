import { fetchProducts } from '@/app/lib/data';
import AllJeansList from '@/app/ui/home/all-jeans-list';

export default async function Page() {
  const products = await fetchProducts();
  const basePath = '/dashboard/products/';

  return <AllJeansList products={products} basePath={basePath} />;
}
