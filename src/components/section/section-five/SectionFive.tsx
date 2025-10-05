"use client";

import Image from "next/image";
import SignUpForm from "../section-one/SignUpForm";

export function SectionFive() {
  return (
    <div className="flex justify-center my-10 px-4 sm:my-20">
      <div
        className="
          relative
          w-full
          max-w-[480px]
          min-h-[420px]
          bg-background
          text-black
          p-4
          sm:p-6
          rounded-xl
          shadow-around
        "
      >
        {/* Ракета */}
        <Image
          src="/3d-rocket2.png"
          alt="rocket"
          width={150}
          height={150}
          className="absolute -left-20 -top-12 pointer-events-none select-none hidden sm:block"
        />

        <SignUpForm />
      </div>
    </div>
  );
}
