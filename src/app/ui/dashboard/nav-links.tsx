'use client';
import {
  FolderIcon,
  HomeIcon,
  PlusIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const links = [
  { name: 'Add products', href: '/dashboard', icon: PlusIcon },

  { name: 'Products', href: '/dashboard/products', icon: FolderIcon },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium md:flex-none md:justify-start md:p-2 md:px-3',
              'bg-orange-100 text-gray-600 hover:bg-orange-200 hover:text-orange-500 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-orange-400',
              {
                'bg-orange-100 text-orange-400 dark:bg-orange-500 dark:text-gray-900':
                  pathname === link.href,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
