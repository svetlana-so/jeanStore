import Form from '@/app/ui/products/add-form';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Add Product',
};

export default async function Page() {
  return (
    <main>
      <Form />
    </main>
  );
}
