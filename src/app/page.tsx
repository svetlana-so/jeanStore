import { Suspense } from 'react';
import AllJeansList from './ui/home/all-jeans-list';
import Loading from './ui/skeletons';

export default async function Home() {
  return (
    <main>
      <Suspense fallback={<Loading />}>
        <AllJeansList />
      </Suspense>
      <div className="mt-5 flex w-full justify-center"></div>
    </main>
  );
}
