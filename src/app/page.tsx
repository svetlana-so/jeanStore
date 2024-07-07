import { fetchProductsPages } from "./lib/data";
import NavBar from "./ui/home/nav-bar";
import JeansList from "./ui/products/jeansList";

export default async function Home({searchParams}: {
  searchParams?: {
    query?: string,
    page?: string
  }
}) {

  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = fetchProductsPages(query)
  return (
    <main>
      
      <div className="m-4">
      <NavBar/>
      </div>  
      <div >
        <JeansList query={query} currentPage={currentPage}/>
      </div>
        
    </main>
  );
}
