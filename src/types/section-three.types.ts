export interface IGrade {
  id: string;
  title: string;
}

export interface IPricingCard {
  id: string;
  title: string;
  price: string;
  description: string;
  features: string[];
  buttonText: string;
  highlight?: boolean;
}
