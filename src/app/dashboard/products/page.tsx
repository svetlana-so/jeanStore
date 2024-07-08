import { fetchProducts } from "@/app/lib/data";
import { Card } from "@/app/ui/products/card";
import AllJeansList from "@/app/ui/home/all-jeans-list";

export default async function Page() {

  const products = await fetchProducts();

  return (
    
    <AllJeansList/>
 
  )
  
}
