import { Metadata } from 'next';
import LoginForm from '@/app/ui/login-form';
import type { ReactElement } from 'react';
import HomeBtn from '../ui/homeBtn';

export const metadata: Metadata = {
  title: 'Login',
};
export default function LoginPage() {

  const pathName = '/'
  return (
    <>
    <HomeBtn path = {pathName}/>
    <div className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-orange-400 p-3 md:h-36"></div>
        <LoginForm />
      </div>
    </div>
    </>
  );
}
