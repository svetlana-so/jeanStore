import { Card } from "./ui/products/card";
import { fetchProducts } from "./lib/data";
import NavBar from "./ui/home/nav-bar";

export default async function Home() {

  const products = await fetchProducts();
  
  return (
    <main>
      <div className="m-4">
      <NavBar/>
      </div>
    
      
      <div className="m-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map(product => (
            <Card key={product.id} product={product}/>
          ))}
        </div>
        
    </main>
  );
}
