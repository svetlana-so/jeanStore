'use client';
import React from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from '@nextui-org/react';
import clsx from 'clsx';
import { ModeToggle } from '@/components/ui/mode-toggle';

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { name: 'Women', value: 'women', href: '/women' },
    { name: 'Men', value: 'men', href: '/men' },
    { name: 'Kids', value: 'kids', href: '/kids' },
  ];

  const handleMenuItemClick = (value: string) => {
    router.push(value);
  };

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent className="sm:hidden" justify="start">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>Menu</DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            {menuItems.map((link) => (
              <DropdownItem
                key={link.name}
                className={clsx(
                  'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium text-gray-900 hover:bg-sky-100 hover:text-orange-400 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-orange-400 md:flex-none md:justify-start md:p-2 md:px-3',
                  {
                    'text-orange-400 dark:text-orange-400':
                      pathname === link.href,
                  },
                )}
                onClick={() => handleMenuItemClick(link.href)}
              >
                {link.name}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>

      <NavbarContent className="pr-3" justify="center">
        <NavbarBrand>
          <button
            onClick={() => router.push('/')}
            className="rounded-lg bg-orange-400 p-2 font-bold text-inherit dark:bg-orange-400 dark:text-gray-200"
          >
            ReJeans
          </button>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        {menuItems.map((link) => (
          <NavbarItem key={link.name}>
            <Link
              color="foreground"
              href={link.href}
              className={clsx('dark:text-gray-200', {
                'text-orange-400': pathname === link.href,
              })}
            >
              {link.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button
            className="dark:text-gray-200"
            as={Link}
            color="primary"
            href="login"
            variant="flat"
          >
            Admin
          </Button>
          <ModeToggle />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
