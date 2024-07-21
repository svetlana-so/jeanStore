'use client';

import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from './button';
import { SubmitHandler, useForm } from 'react-hook-form';
import { LoginFormFields } from '@/app/lib/actions';
import { useRouter } from 'next/navigation';
import { authenticate } from '@/app/lib/actions';

export default function LoginForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormFields>();

  const onSubmit: SubmitHandler<LoginFormFields> = async (data) => {
    try {
      await authenticate(data);
      router.push('/dashboard');
    } catch (error: any) {
      setError('root', {
        type: 'manual',
        message: error.message || 'Error logging in',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <div className="flex-1 rounded-lg bg-white px-6 pb-4 pt-8 dark:bg-gray-800">
        <h1 className="mb-3 text-2xl text-gray-900 dark:text-orange-400">
          Please log in to continue.
        </h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900 dark:text-gray-200"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                {...register('email', {
                  required: 'Is required',
                })}
                className="peer block w-full rounded-md border border-gray-300 bg-gray-50 py-[9px] pl-10 text-sm text-gray-900 outline-none placeholder:text-gray-500 focus:border-orange-400 focus:ring-1 focus:ring-orange-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:placeholder:text-gray-400 dark:focus:border-orange-400"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-orange-400 dark:text-gray-400 dark:peer-focus:text-orange-400" />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900 dark:text-gray-200"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                {...register('password', {
                  required: 'Password is required',
                })}
                className="peer block w-full rounded-md border border-gray-300 bg-gray-50 py-[9px] pl-10 text-sm text-gray-900 outline-none placeholder:text-gray-500 focus:border-orange-400 focus:ring-1 focus:ring-orange-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:placeholder:text-gray-400 dark:focus:border-orange-400"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-orange-400 dark:text-gray-400 dark:peer-focus:text-orange-400" />
            </div>
          </div>
        </div>
        <Button className="mt-4 w-full bg-orange-400 py-2 text-white hover:bg-orange-500 dark:bg-orange-400 dark:hover:bg-orange-500">
          {isSubmitting ? 'Loading' : 'Login'}{' '}
          <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>
        
      </div>
      <div
          className="flex items-end"
          aria-live="polite"
          aria-atomic="true"
        >
          {errors.root && (
            <div className="text-red-400">{errors.root.message}</div>
          )}
        </div>
    </form>
  );
}
