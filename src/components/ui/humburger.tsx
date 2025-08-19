interface Props {
  onClick: () => void;
}

export function HamburgerButton({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="hidden sm:flex flex-col justify-between w-8 h-6"
    >
      <span className="h-1 w-full bg-black rounded" />
      <span className="h-1 w-full bg-black rounded" />
      <span className="h-1 w-full bg-black rounded" />
    </button>
  );
}
