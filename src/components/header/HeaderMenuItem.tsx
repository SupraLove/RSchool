import Link from "next/link";
import { IHeaderMenuItem } from "./header-menu.data";

interface Props {
  item: IHeaderMenuItem;
  onClick?: () => void;
}

export function HeaderMenuItem({ item, onClick }: Props) {
  return (
    <li className="flex items-center">
      <Link
        href={item.href}
        className="text-black/80 text-xl sm:text-lg hover:text-primary"
        onClick={onClick}
      >
        {item.label}
      </Link>
    </li>
  );
}
