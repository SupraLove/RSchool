import Image from "next/image";
import { HEADER_MENU_DATA } from "./header-menu.data";
import { HeaderMenuItem } from "./HeaderMenuItem";

export function Header() {
  return (
    <div className="flex justify-between items-center px-58 py-4 bg-white mx-4 shadow-sm rounded-lg my-4">
      <Image src="/logotip_v4.png" alt="logo" width={145} height={145} />

      <nav>
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
