'use client'
import React from "react";
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar} from "@nextui-org/react";
import clsx from 'clsx';


export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { name: 'Women', value: 'women', href : '/women' },
    { name: 'Men', value: 'men', href : '/men' },
    { name: 'Kids', value: 'kids' , href : '/kids'},
  ];

  const handleMenuItemClick = (value: string) => {
    router.push(value);
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
                  'text-blue-600': pathname === link.href,
                },
              )}
              onClick={() => handleMenuItemClick(link.href)}
             >
              {link.name}</DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
     
    </NavbarContent>

    <NavbarContent className="pr-3" justify="center">
      <NavbarBrand>
        <button onClick={() => router.push('/')} className="font-bold text-inherit bg-cyan-100 p-2 rounded-lg">ReJeans</button>
      </NavbarBrand>
    </NavbarContent>

      <NavbarContent 
      className="hidden sm:flex gap-4" justify="center">
        {menuItems.map((link) => (
              <NavbarItem key={link.name}>
                <Link color="foreground" 
              href={link.href}
              className={clsx({
                'text-cyan-600': pathname === link.href,
              })}
               >
              {link.name}
            </Link>
            </NavbarItem>
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
