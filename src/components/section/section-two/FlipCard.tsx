"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

interface Props {
  front: string;
  back: string[] | string;
  height?: string;
  img?: string;
}

// Отдельный компонент для фронта
const FrontContent = ({ front, img }: { front: string; img?: string }) => {
  if (img) {
    return (
      <>
        <Image
          src={img}
          alt={front}
          fill
          className="object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/50 " />
        <h3 className="relative z-10 text-center text-2xl md:text-xl font-bold px-4 ">
          {front}
        </h3>
      </>
    );
  }
  return (
    <div className="w-full h-full flex items-center justify-center bg-primary-foreground rounded-xl p-4 ">
      <h3 className="text-2xl md:text-xl font-bold text-center ">{front}</h3>
    </div>
  );
};

// Отдельный компонент для бэка
const BackContent = ({ back }: { back: string[] | string }) => {
  if (Array.isArray(back)) {
    return (
      <div className="flex flex-col gap-4 w-full">
        {back.map((item, index) => (
          <div key={index} className="flex items-center space-x-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-violet-400 text-white font-bold text-lg flex-shrink-0">
              {index + 1}
            </div>
            <div className="text-left text-xl md:text-base">{item}</div>
          </div>
        ))}
      </div>
    );
  }
  return <p>{back}</p>;
};

const FlipCardComponent = ({ front, back, height = "h-48", img }: Props) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className={`perspective  ${height}`} data-flipped={flipped}>
      <div
        className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d  card-inner ${
          flipped ? "rotate-y-180" : ""
        }`}
      >
        {/* FRONT */}
<div
  className="card-front cursor-pointer flex items-center justify-center text-white shadow-around backface-hidden"
  onClick={() => setFlipped(!flipped)}
>
  <FrontContent front={front} img={img} />
</div>

{/* BACK */}
<div className="card-back flex flex-col items-start justify-center bg-white text-black shadow-around backface-hidden rotate-y-180 p-6 space-y-6">
  <BackContent back={back} />
  <button
    className="mt-1 px-4 py-2 bg-violet-400 text-white rounded z-50"
    onClick={() => setFlipped(false)}
  >
    Назад
  </button>
</div>

      </div>
    </div>
  );
};

// Memo с displayName
export const FlipCard = React.memo(FlipCardComponent);
FlipCard.displayName = "FlipCard";

// <div className="flex flex-col gap-3">
//           <Link
//             href="https://vk.com/topic-232142418_54205609"
//             className="bg-blue-500 text-white rounded-2xl p-2.5 "
//           >
//             Перейти к отзывам VK
//           </Link>
//           <Link
//             href="https://www.avito.ru/yoshkar-ola/predlozheniya_uslug/repetitor_po_matematike_informatike_i_fizike_7580334198#open-reviews-list"
//             className="bg-green-400 text-white rounded-2xl p-2.5 "
//           >
//             Перейти к отзывам Avito
//           </Link>
//         </div>
