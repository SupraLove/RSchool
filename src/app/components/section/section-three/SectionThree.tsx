import SectionTitle from "@/components/ui/SectionTitle";
import { PRICING_PLANS } from "./price-card.data";
import { PricingCard } from "./PricingCard";

export function SectionThree() {
  return (
    <>
      <SectionTitle
        text="Наши тарифы |"
        highlight="Стоимость зависит от класса ученика"
      />

      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-3">
          {PRICING_PLANS.map((plan) => (
            <PricingCard
              key={plan.id}
              title={plan.title}
              price={plan.price}
              description={plan.description}
              features={plan.features}
              buttonText={plan.buttonText}
              highlight={plan.highlight}
            />
          ))}
        </div>
      </div>
    </>
  );
}
