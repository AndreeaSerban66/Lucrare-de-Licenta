"use client";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/16/solid";
import React, { useState } from "react";
import logo from "../images/logo.webp";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

interface NavLink {
  name: string;
  href: string;
  onClick?: () => void;
}

const navigationLinks: NavLink[] = [
  { name: "Acasă", href: "/" },
  { name: "Articole", href: "/articles" },
  { name: "Tipare", href: "/templates" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathName = usePathname();
  const { data: session } = useSession();

  const getNavigationLinks = (): NavLink[] => {
    const links = [...navigationLinks];
    if (session) {
      links.push({ name: "Logout", href: "/", onClick: () => signOut() });
    } else {
      links.push({ name: "Login", href: "/login" });
    }
    return links;
  };

  const links = getNavigationLinks();

  return (
    <header className="absolute top-0 left-0 w-full bg-gradient-to-b from-tiffany_blue via-alice_blue z-50 ">
      <nav
        className="mx-auto flex max-w-screen-2xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <Link href="/" className="-m-1.5 p-1.5">
          <span className="sr-only">Sewing blog</span>
          <Image
            src={logo}
            alt="Croitoresele Fericite"
            className="rounded-full lg:h-[100px] lg:w-[100px] h-[50px] w-[50px]"
          />
        </Link>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6 text-black" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {links.map((item) =>
            item.onClick ? (
              <button
                key={item.name}
                onClick={item.onClick}
                className={`text-sm font-poppins hover:text-white text-black ${
                  pathName === item.href ? "border-b-2 border-black pb-2" : ""
                }`}
              >
                {item.name}
              </button>
            ) : (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-poppins hover:text-white text-black ${
                  pathName === item.href ? "border-b-2 border-black pb-2" : ""
                }`}
              >
                {item.name}
              </Link>
            )
          )}
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 w-full overflow-y-auto bg-alice_blue px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 z-50">
          <div className="flex items-center justify-between">
            <Link href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Sewing blog</span>
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6 text-black" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {links.map((item) =>
                  item.onClick ? (
                    <button
                      key={item.name}
                      onClick={item.onClick}
                      className="-mx-3 block rounded-lg px-3 py-2 font-poppins leading-7 text-black hover:text-white"
                    >
                      {item.name}
                    </button>
                  ) : (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`-mx-3 block rounded-lg px-3 py-2 font-poppins leading-7 hover:text-black ${
                        pathName === item.href ? "text-black" : "text-black"
                      }`}
                    >
                      {item.name}
                    </Link>
                  )
                )}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
