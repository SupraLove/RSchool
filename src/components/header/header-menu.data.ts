export interface IHeaderMenuItem {
  label: string;
  href: string;
}

export const HEADER_MENU_DATA: IHeaderMenuItem[] = [
  { label: "Главная", href: "/" },
  { label: "Задачи", href: "/tasksMenu" },
  { label: "Отзывы", href: "/reviewsMenu" },
  { label: "О школе", href: "/contacts" },
  { label: "Чилл-зона", href: "/chillZoneMenu" },
];
