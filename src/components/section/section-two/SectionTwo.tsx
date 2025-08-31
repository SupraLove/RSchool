"use client";

import SectionTitle from "@/components/ui/SectionTitle";
import { CARDS } from "./cards.data";
import { FlipCard } from "./FlipCard";
import Link from "next/link";

export default function SectionTwo() {
  return (
    <>
      <SectionTitle text="Почему" highlight="мы?" />
      <div className="grid grid-cols-3 md:grid-cols-2 xs:grid-cols-1 gap-6 max-w-9xl  mx-auto px-4 bg-gray-50">
        {/* Левая колонка */}
        <div className="flex flex-col gap-6 xs:col-span-1">
          {CARDS.slice(0, 2).map((card, i) => (
            <FlipCard
              key={i}
              front={card.title}
              back={card.back}
              height="h-[450px]"
              img={card.image}
            />
          ))}
        </div>

        {/* Центральная колонка */}
        <div className="flex flex-col gap-6 xs:col-span-1">
          {CARDS.slice(2, 4).map((card, i) => (
            <FlipCard
              key={i}
              front={card.title}
              back={card.back}
              height="h-[450px]"
              img={card.image}
            />
          ))}
        </div>

        {/* Правая колонка */}
        <div className="flex flex-col md:col-span-2 gap-6 xs:col-span-1">
          <FlipCard
            front={CARDS[4].title}
            back={CARDS[4].back}
            height="h-[924px] md:h-[350px] "
            img={CARDS[4].image}
          />
        </div>
      </div>
    </>
  );
}
