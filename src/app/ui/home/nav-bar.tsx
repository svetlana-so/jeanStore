'use client'
import React from "react";
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar} from "@nextui-org/react";
import clsx from 'clsx';
import { useDebouncedCallback } from 'use-debounce';

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const searchParams = useSearchParams()
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { name: 'Women', value: 'women' },
    { name: 'Men', value: 'men' },
    { name: 'Kids', value: 'kids' },
  ];

  
  const handleMenuItemClick = (query: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('query', query);
    params.set('page', '1');
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Navbar
    onMenuOpenChange={setIsMenuOpen}
  >
    <NavbarContent className="sm:hidden" justify="start">
    <Dropdown placement="bottom-end">
          <DropdownTrigger>
            Menu
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            {menuItems.map((link) => (
              <DropdownItem key={link.name} className={clsx(
                'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-cyan-600 md:flex-none md:justify-start md:p-2 md:px-3',
                {
                  'bg-sky-100 text-blue-600': pathname === link.value,
                },
              )}
              onClick={() => handleMenuItemClick(link.value)}>{link.name}</DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
     
    </NavbarContent>

    <NavbarContent className="pr-3" justify="center">
      <NavbarBrand>
        <p className="font-bold text-inherit">ReJeans</p>
      </NavbarBrand>
    </NavbarContent>

      <NavbarContent 
      className="hidden sm:flex gap-4" justify="center">
        {menuItems.map((link) => (
              <NavbarItem key={link.name}><Link color="foreground" 
              onClick={(e) => {
                e.preventDefault();
                handleMenuItemClick(link.value);
              }}>
              {link.name}
            </Link></NavbarItem>
            ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
           Admin
          </Button>
        </NavbarItem>
      </NavbarContent>
      
    </Navbar>
  );
}
