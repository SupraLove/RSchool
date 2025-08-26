interface SectionTitleProps {
  text: string;
  highlight?: string; // часть, которая выделяется цветом
  className?: string; // доп. классы, если надо переопределить стили
}

export default function SectionTitle({
  text,
  highlight,
  className,
}: SectionTitleProps) {
  return (
    <h2
      className={`text-6xl font-bold xs:text-3xl text-center m-20 text-black/80${
        className || ""
      }`}
    >
      {text} {highlight && <span className="text-primary">{highlight}</span>}
    </h2>
  );
}
