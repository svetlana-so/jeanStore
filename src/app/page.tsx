import { Suspense } from 'react';
import AllJeansList from './ui/home/all-jeans-list';
import Loading from './ui/skeletons';
import NavBar from './ui/home/nav-bar';

export default async function Home() {
  return (
    <main>
      <div className="w-full flex-none p-4">
        <NavBar />
      </div>
      <Suspense fallback={<Loading />}>
        <AllJeansList />
      </Suspense>
      <div className="mt-5 flex w-full justify-center"></div>
    </main>
  );
}
