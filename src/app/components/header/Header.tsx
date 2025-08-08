import Image from "next/image";
import { HEADER_MENU_DATA } from "./header-menu.data";
import { HeaderMenuItem } from "./HeaderMenuItem";

export function Header() {
  return (
    <div className="flex justify-between items-center px-24 py-4">
      <Image src="/logotip_v4.png" alt="logo" width={145} height={145} />

      <nav className="rounded-full bg-white px-9 py-2 shadow-md">
        <ul className="flex gap-9 items-center justify-center">
          {HEADER_MENU_DATA.map((item) => (
            <HeaderMenuItem key={item.label} item={item} />
          ))}
        </ul>
      </nav>
      <button className="rounded-full bg-black px-4 py-2 text-white text-xl hover:bg-primary">
        Консультация
      </button>
    </div>
  );
}
