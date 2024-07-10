import { Metadata } from 'next';
import JeansList from '../ui/products/jeansList';
import { fetchProductsByCategory } from '../lib/data';
import PopOver from '../ui/filter-pop-over';
import { Filter } from '../ui/products/filter';



export const metadata: Metadata = {
  title: 'All Product By Category',
};


export default async function Page({params} : { params: { category: string } }) {


const data = params.category
const category = data.charAt(0).toUpperCase() + data.slice(1);
const products = await fetchProductsByCategory(category);


  return (
    <div className="mx-4">
      <Filter />
      <JeansList products = {products} />
    </div>
  );
}