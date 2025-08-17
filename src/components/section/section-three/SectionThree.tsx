"use client";
import React, { useState } from "react";
import SectionTitle from "@/components/ui/SectionTitle";
import { PRICING_CARDS } from "./price-card.data";
import { PricingCard } from "./PricingCard";
import { TabsButton } from "./TabsButton";
import { GRADES } from "./btn-card.date";

export function SectionThree() {
  // selectedGradeId - выбранный класс (id типа string)
  const [selectedGradeId, setSelectedGradeId] = useState<string>(GRADES[0].id);

  return (
    <>
      <SectionTitle
        text="Наши тарифы |"
        highlight="Стоимость зависит от класса ученика"
      />
      {/* Передаем текущий выбранный id и функцию для смены */}
      <TabsButton
        selectedId={selectedGradeId}
        onSelect={(id: string) => setSelectedGradeId(id)}
      />
      <div className="flex items-center justify-center">
        {/* Фильтруем карточки по выбранному id */}
        {PRICING_CARDS.filter((card) => card.id === selectedGradeId).map(
          (card) => (
            <PricingCard key={card.id} {...card} />
          )
        )}
      </div>
    </>
  );
}
