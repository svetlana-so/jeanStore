import { notFound, redirect } from 'next/navigation';
import { Metadata } from 'next';
import { fetchProductById } from '@/app/lib/data';
import { EditForm } from '@/app/ui/products/edit-form';


export const metadata: Metadata = {
  title: 'Edit Product',
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const product = await fetchProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <div>

      <EditForm
      //@ts-ignore
        product={product}
       
      />
    </div>
  );
}
