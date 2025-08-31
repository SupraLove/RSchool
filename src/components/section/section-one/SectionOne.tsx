"use client";

import Image from "next/image";

import SignUpForm from "./SignUpForm";

const features = [
  "Приведи друга - получи бесплатное индивидуальное занятие",
  "Стоимость занятий закрепляется на весь учебный год",
];

export function SectionOne() {
  return (
    <section className="h-[700px] bg-primary-foreground grid grid-cols-2 justify-items-center rounded-lg mx-4 md:grid-cols-1 md:h-[900px] sm:h-[1100px] xs:p-2 xs:h-auto">
      {/* Левая часть — текст */}
      <div className="text-center self-center xl:pl-0 pl-8 xs:pl-0 md:mt-4">
        <p className="text-6xl xl:text-5xl md:text-4xl xs:text-2xl mx-auto max-w-[80%]  text-white leading-tight">
          <span className="bg-white/70 rounded-full px-3 text-primary-foreground">
            Индивидуальные
          </span>{" "}
          онлайн-занятия с репетитором для 5−11 классов
        </p>

        <p className="text-2xl text-white lg:text-xl mt-7 md:text-xl xs:text-md mx-auto max-w-[70%] leading-relaxed ">
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

        <div className="flex flex-col  xs:flex-col xs:items-center gap-5 mt-7 justify-center md:mb-4">
          {features.map((text, i) => (
            <div
              key={i}
              className="w-auto h-auto  bg-white/70 rounded-2xl flex flex-col justify-between text-left lg:p-0.5  p-3"
            >
              <div className="flex items-center gap-2 justify-center">
                <span className="text-xl">🤍</span>
                <p className="text-violet-400 font-semibold xs:text-center">
                  {text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Правая часть — форма с ракетой в одном контейнере */}
      <div className="relative lg:w-[380px] w-[480px] min-h-[480px] xs:w-[300px] xxs:w-[240px] self-center bg-background text-black p-6 rounded-xl shadow-around">
        {/* Ракета абсолютом внутри контейнера формы */}
        <Image
          src="/3d-rocket2.png"
          alt="rocket"
          width={245}
          height={245}
          className="absolute -left-36 -top-19 md:-left-22 md:-top-10  md:w-40 md:h-40 sm:-left-13 sm:-top-10  sm:w-30 sm:h-30 w-60 h-60 pointer-events-none select-none"
        />

        <SignUpForm />
      </div>
    </section>
  );
}
