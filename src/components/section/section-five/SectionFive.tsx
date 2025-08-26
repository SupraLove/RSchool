"use client";

import Image from "next/image";
import SignUpForm from "../section-one/SignUpForm";

export function SectionFive() {
  return (
    <div className="flex justify-center my-20">
      <div className="relative w-[480px] min-h-[480px] self-center bg-background text-black p-6 rounded-xl shadow-around">
        {/* Ракета абсолютом внутри контейнера формы */}
        <Image
          src="/3d-rocket2.png"
          alt="rocket"
          width={245}
          height={245}
          className="absolute -left-36 -top-19 pointer-events-none select-none"
        />
        <SignUpForm />
      </div>
    </div>
  );
}
