import { Metadata } from 'next';
import JeansList from '../ui/products/jeansList';
import { fetchAllAttributes, fetchProductsByCategory } from '../lib/data';
import { Filter } from '../ui/products/filter';

export const metadata: Metadata = {
  title: 'All Product By Category',
};

export default async function Page({
  params,
}: {
  params: { category: string };
}) {
  const data = params.category;
  const category = data.charAt(0).toUpperCase() + data.slice(1);
  const products = await fetchProductsByCategory(category);

  const {
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
    <div className="mx-4">
      <Filter
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
        measurementInseam={measurementInseam}
      />
      <JeansList products={products} />
    </div>
  );
}
