import { fetchProducts } from "@/app/lib/data";
import { Card } from "@/app/ui/products/card";

export default async function Page() {

  const products = await fetchProducts();

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
    {products.map(product => (
      <Card key={product.id} product={product}/>
    ))}
  </div>
  )
  
}
