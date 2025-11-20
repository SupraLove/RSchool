import Image from "next/image";
import { HEADER_MENU_DATA } from "../header/header-menu.data";
import { HeaderMenuItem } from "../header/HeaderMenuItem";
import Link from "next/link";

export function Footer() {
  return (
    <div className="w-full bg-white grid grid-cols-4 h-auto sm:grid-cols-2 gap-8 border-t-4 border-primary">
      <div className=" flex flex-col items-center">
        <Image
          src="/logotip_v4.png"
          alt="logo"
          width={245}
          height={245}
          className="mt-3"
        />
        <p className="text-2xl text-center mt-4 md:text-xl text-black/70">
          Современная онлайн-школа, которая предоставляет качественное обучение
          не выходя из дома
        </p>
      </div>
      <div className=" text-center flex flex-col">
        <p className="text-2xl mt-6 text-primary">Контакты</p>
        <p className="text-2xl text-center md:text-xl mt-14 text-black/70">
          +7 (987) 528-03-86
        </p>
      </div>
      <div>
        <p className="text-2xl text-center mt-6 text-primary">
          Социальные сети
        </p>
        <div className="flex gap-1 mt-14 justify-center">
          <Link href="https://t.me/rschooledu">
            <Image src="/logo/icons8-tg.svg" alt="tg" width={45} height={45} />
          </Link>

          <Link href="https://vk.com/rschooledu">
            <Image src="/logo/icons8-vk.svg" alt="tg" width={45} height={45} />
          </Link>
        </div>
      </div>
      <div>
        <p className="text-2xl my-6 text-center text-primary">Быстрые ссылки</p>
        <nav>
          <ul className="flex flex-col gap-4 items-center justify-center">
            {HEADER_MENU_DATA.map((item) => (
              <HeaderMenuItem key={item.label} item={item} />
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
