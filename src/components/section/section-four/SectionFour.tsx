"use client";
import SectionTitle from "@/components/ui/SectionTitle";
import { FAQ_DATA } from "./questions.data";
import { FaqItem } from "./FaqItem";
import { useState } from "react";

export function SectionFour() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <>
      <SectionTitle text="Часто задаваемые вопросы" />
      <section className="max-w-4xl mx-auto md:mx-4">
        <div className="divide-y divide-gray-300">
          {FAQ_DATA.map((item, i) => (
            <FaqItem
              key={i}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === i}
              onClick={() => toggle(i)}
            />
          ))}
        </div>
      </section>
    </>
  );
}
