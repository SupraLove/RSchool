import { cn } from "@/lib/utils";
import { useState } from "react";
import Image from "next/image";

interface Props {
  front: string;
  back: string[] | string;
  height?: string;
  img?: string;
}

export const FlipCard = ({ front, back, height = "h-48", img }: Props) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className={cn(`perspective cursor-pointer ${height}`)}
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d ${
          flipped ? "rotate-y-180" : ""
        }`}
      >
        {/* FRONT */}
        <div className="absolute inset-0 flex items-center justify-center rounded-xl text-white shadow-around backface-hidden overflow-hidden hover:text-white/70">
          {img ? (
            <>
              {/* Фото фоном на всю карточку */}
              <Image src={img} alt={front} fill className="object-cover" />
              {/* Затемнение */}
              <div className="absolute inset-0 bg-black/50" />
              {/* Текст поверх */}
              <h3 className="relative z-10 md:text-xl text-2xl font-bold text-center px-4 ">
                {front}
              </h3>
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-primary-foreground rounded-xl p-4">
              <h3 className="text-2xl md:text-xl font-bold text-center">
                {front}
              </h3>
            </div>
          )}
        </div>

        {/* BACK */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white text-black rounded-xl shadow-around backface-hidden rotate-y-180 p-6">
          {Array.isArray(back) ? (
            <ul className="list-disc text-left space-y-1">
              {back.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          ) : (
            <p>{back}</p>
          )}
        </div>
      </div>
    </div>
  );
};
