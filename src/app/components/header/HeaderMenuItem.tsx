import Link from "next/link";
import { IHeaderMenuItem } from "./header-menu.data";

interface Props {
  item: IHeaderMenuItem;
}

export function HeaderMenuItem({ item }: Props) {
  return (
    <li className="flex items-center">
      <Link
        href={item.href}
        className="text-black/80 text-xl hover:text-primary"
      >
        {item.label}
      </Link>
    </li>
  );
}
