"use client";

import Image from "next/image";
import SignUpForm from "./SignUpForm";

const features = [
  "Приведи друга - получи бесплатное индивидуальное занятие",
  "Стоимость занятий закрепляется на весь учебный год",
];

export function SectionOne() {
  return (
    <section
      className="
        bg-primary-foreground 
        grid grid-cols-2 
        justify-items-center 
        items-center
        rounded-lg 
        mx-4 
        h-[700px]

        /* Мобильная версия — столбик */
        sm:grid-cols-1 sm:h-auto sm:py-10 
        md:grid-cols-1 md:h-auto md:py-10 
      "
    >
      {/* Левая часть — текст */}
      <div className="text-center self-center pl-8 xl:pl-0 sm:pl-0 sm:order-1">
        <p className="text-6xl 2xl:text-4xl xl:text-5xl lg:text-2xl md:text-4xl sm:text-2xl mx-auto max-w-[80%] text-white leading-tight">
          <span className="bg-white/70 rounded-full 2xl:text-3xl px-3 text-primary-foreground">
            Индивидуальные
          </span>{" "}
          онлайн-занятия с репетитором для 5−11 классов
        </p>

        <p className="text-2xl text-white lg:text-xl mt-7 sm:text-lg mx-auto max-w-[70%] leading-relaxed">
          <span className="block xl:inline">
            Устраним пробелы за все предыдущие классы
          </span>{" "}
          <span className="block xl:inline">
            с помощью{" "}
            <span className="inline bg-violet-400 rounded-full px-2">
              индивидуальной программы,
            </span>{" "}
          </span>{" "}
          <span className="block xl:inline">
            составленной исходя из интересов ученика
          </span>
        </p>

       <div className="flex flex-col gap-5 mt-7 justify-center sm:items-center">
  {features.map((text, i) => (
    <div
      key={i}
      className="
        bg-white/70 rounded-2xl 
        flex flex-col justify-between text-left 
        p-3 
        w-[85%] max-w-[600px] mx-auto
        sm:w-[90%] sm:max-w-[340px]
      "
    >
      <div className="flex items-center gap-2 justify-center">
        <span className="text-xl">🤍</span>
        <p className="text-violet-400 font-semibold sm:text-center">
          {text}
        </p>
      </div>
    </div>
  ))}
</div>

      </div>

      {/* Правая часть — форма */}
      <div
        className="
          relative 
          w-[480px] min-h-[480px] 
          bg-background text-black p-6 
          rounded-xl shadow-around 
          sm:w-[90%] sm:min-h-[400px] sm:order-2 sm:mt-10
          md:w-[90%] md:min-h-[400px] md:order-2 md:mt-10
        "
      >
        <Image
          src="/3d-rocket2.png"
          alt="rocket"
          width={245}
          height={245}
          className="
            absolute -left-36 -top-19
            md:-left-22 md:-top-10 md:w-40 md:h-40
            sm:-left-10 sm:-top-8 sm:w-28 sm:h-28
            pointer-events-none select-none
          "
        />
        <SignUpForm />
      </div>
    </section>
  );
}
