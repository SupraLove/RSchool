import { Button } from "@/components/ui/button";
import React from "react";

interface PricingCardProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  buttonText: string;
  highlight?: boolean;
}

export const PricingCard = ({
  title,
  price,
  description,
  features,
  buttonText,
}: PricingCardProps) => {
  return (
    <div
      className={`flex flex-col justify-between rounded-2xl border p-6 shadow-around bg-white`}
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
