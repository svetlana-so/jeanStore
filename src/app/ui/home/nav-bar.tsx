'use client'
import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar} from "@nextui-org/react";


export default function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    "Kids",
    "Men",
    "Women"
  ];

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
            {menuItems.map((item) => (
              <DropdownItem key={item}>{item}</DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
     
    </NavbarContent>

    <NavbarContent className="sm:hidden pr-3" justify="center">
      <NavbarBrand>
        <p className="font-bold text-inherit">ReJeans</p>
      </NavbarBrand>
    </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Kids
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Men
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Women
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
           Admin
          </Button>
        </NavbarItem>
      </NavbarContent>
      
    </Navbar>
  );
}
