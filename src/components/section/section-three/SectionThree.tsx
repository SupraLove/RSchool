"use client";
import React, { useState } from "react";
import SectionTitle from "@/components/ui/SectionTitle";
import { PRICING_CARDS } from "./price-card.data";
import { PricingCard } from "./PricingCard";
import { TabsButton } from "./TabsButton";
import { GRADES } from "./btn-card.date";

export function SectionThree() {
  const [selectedGradeId, setSelectedGradeId] = useState<string>(GRADES[0].id);

  return (
    <>
      <SectionTitle
        text="Наши тарифы |"
        highlight="Стоимость зависит от класса ученика"
      />
      <TabsButton
        selectedId={selectedGradeId}
        onSelect={(id: string) => setSelectedGradeId(id)}
      />
      <div className="flex items-center justify-center">
        {PRICING_CARDS.filter((card) => card.id === selectedGradeId).map(
          (card) => (
            <PricingCard key={card.id} {...card} />
          )
        )}
      </div>
    </>
  );
}
