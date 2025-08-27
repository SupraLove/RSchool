"use client";

import Image from "next/image";
import { HEADER_MENU_DATA } from "./header-menu.data";
import { HeaderMenuItem } from "./HeaderMenuItem";
import { HamburgerButton } from "../ui/humburger";
import { useEffect, useState } from "react";
import Link from "next/link";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div className="flex justify-between items-center lg:px-16 md:px-4 xl:px-32 px-58 py-1 sm:justify-between bg-white mx-4 shadow-sm rounded-lg my-4">
      <Link href="/" className="hover:opacity-80">
        <div className="relative lg:w-28 md:w-24  lg:h-16 w-36 h-16">
          <Image
            src="/logotip_v4.png"
            alt="logo"
            fill
            className="object-contain"
          />
        </div>
      </Link>

      <nav>
        <ul className="flex gap-9 lg:gap-5 sm:gap-4 sm:hidden  md:gap-3 items-center justify-center">
          {HEADER_MENU_DATA.map((item) => (
            <HeaderMenuItem key={item.label} item={item} />
          ))}
        </ul>
      </nav>
      <button className="rounded-full sm:hidden bg-black px-4 py-2 text-white md:text-lg text-xl hover:bg-primary">
        Консультация
      </button>
      <HamburgerButton onClick={() => setIsOpen(!isOpen)} />

      {/* Сайдбар */}
      <div
        className={`fixed top-0 right-0 h-full w-full bg-white z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={() => setIsOpen(false)}
            className="text-2xl font-bold"
          >
            ✕
          </button>
        </div>
        <ul className="flex flex-col items-center justify-center gap-6 mt-16 text-xl">
          {HEADER_MENU_DATA.map((item) => (
            <HeaderMenuItem
              key={item.label}
              onClick={() => setIsOpen(false)}
              item={item}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
