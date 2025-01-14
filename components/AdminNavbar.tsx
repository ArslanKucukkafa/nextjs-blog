"use client";
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { useFullAuthStore } from "@/store/authStore";
import { authApi } from "@/services/authApi";

export default function AdminNavbar() {
  const { clearToken } = useFullAuthStore();

  const handleLogout = async () => {
    try {
      await authApi.logout();
      clearToken();
      window.location.href = "/auth";
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <Navbar isBordered className="border-b border-divider">
      <NavbarBrand>
        <Link href="/dashboard" className="font-bold text-inherit">
          Admin Panel
        </Link>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                radius="sm"
                variant="light"
              >
                About
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu>
            <DropdownItem key="create-about">
              <Link href="/about/create" className="w-full">
                About Oluştur
              </Link>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>

        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                radius="sm"
                variant="light"
              >
                Articles
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu>
            <DropdownItem key="create-article">
              <Link href="/articles/create" className="w-full">
                Create Articles
              </Link>
            </DropdownItem>
            <DropdownItem key="list-article">
              <Link href="/articles/list" className="w-full">
                List Articles
              </Link>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>

        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                radius="sm"
                variant="light"
              >
                Projects
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu>
            <DropdownItem key="list-project">
              <Link href="/projects/list" className="w-full">
                Projects List
              </Link>
            </DropdownItem>
            <DropdownItem key="hero-text">
              <Link href="/hero" className="w-full">
                Hero Text
              </Link>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>

        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                radius="sm"
                variant="light"
              >
                Perspectives
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu>
            <DropdownItem key="create-perspective">
              <Link href="/perspectives/create" className="w-full">
                Create Perspective
              </Link>
            </DropdownItem>
            <DropdownItem key="list-perspective">
              <Link href="/perspectives/list" className="w-full">
                List Perspectives
              </Link>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <Button color="danger" variant="flat" onPress={handleLogout}>
            Çıkış Yap
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
