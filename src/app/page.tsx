/* eslint-disable @next/next/no-img-element */
import { fetchProducts } from "./lib/data";


export default async function Home() {

  const products = await fetchProducts();
  console.log('Fetched Products:', products);
  return (
    <main>
     <h1>hi</h1>
      <h1 className="mb-4 text-xl md:text-2xl">
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map(product => (
            <div key={product.id} className="p-4 border border-gray-200 rounded-md">
              <h2 className="font-bold">{product.brand}</h2>
              <div className="grid gap-2">
                {product.images.map((url, index) => (
                  <img key={index} src={url} alt={`Image ${index + 1} of ${product.brand}`} className="w-full h-auto object-cover"/>
                ))}
              </div>
            </div>
          ))}
        </div>
        
    </main>
  );
}
