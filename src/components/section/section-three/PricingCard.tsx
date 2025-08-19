import { Button } from "@/components/ui/button";
import { IPricingCard } from "@/types/section-three.types";
import React from "react";

export const PricingCard = ({
  title,
  price,
  description,
  features,
  buttonText,
  highlight,
}: IPricingCard) => {
  return (
    <div
      className={`flex flex-col justify-between rounded-2xl border p-6 md:w-[485px] sm:w-[350px] shadow-around bg-white ${
        highlight ? "border-primary" : "border-gray-200"
      }`}
    >
      <div>
        <h3 className="text-2xl font-bold mb-2 text-black/80">{title}</h3>
        <p className="text-3xl font-extrabold text-primary mb-4">{price}</p>
        <p className="text-gray-600 mb-6">{description}</p>
        <ul className="space-y-3 mb-6">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <Button variant="default" type="submit" className="w-full">
        {buttonText}
      </Button>
    </div>
  );
};
