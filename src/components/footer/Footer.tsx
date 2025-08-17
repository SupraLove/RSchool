import Image from "next/image";
import { HEADER_MENU_DATA } from "../header/header-menu.data";
import { HeaderMenuItem } from "../header/HeaderMenuItem";

export function Footer() {
  return (
    <div className="w-full h-[460px] bg-white grid md:grid-cols-4 gap-8 border-t-4 border-primary">
      <div className=" flex flex-col items-center">
        <Image
          src="/logotip_v4.png"
          alt="logo"
          width={245}
          height={245}
          className="mt-3"
        />
        <p className="text-2xl text-center mt-4 text-black/70">
          Современная образовательная плтаформа, предоставляющая качественное
          обучение в онлайн формате
        </p>
      </div>
      <div className=" text-center flex flex-col">
        <p className="text-2xl mt-6 text-primary">Контакты</p>
        <p className="text-2xl text-center mt-14 text-black/70">
          +7 999 999 99 99
        </p>
        <p className="text-2xl text-center mt-4 text-black/70">
          rschool@mail.ru
        </p>
        <p className="text-2xl text-center mt-4 text-black/70">
          Москва, Центральная д.40
        </p>
      </div>
      <div>
        <p className="text-2xl text-center mt-6 text-primary">
          Социальные сети
        </p>
        <div className="flex gap-1 mt-14 justify-center">
          <Image src="/logo/icons-tg.png" alt="tg" width={45} height={45} />
          <Image src="/logo/icons-vk.png" alt="tg" width={45} height={45} />
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
