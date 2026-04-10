export interface PricingPlan {
  name: string;
  price: string;
  duration: string;
  highlight?: boolean;
  tag?: string;
}

export interface Branch {
  id: 'kadachanenthal' | 'ottakadai';
  name: string;
  address: string;
  phone: string;
  plans: PricingPlan[];
}

export interface Program {
  title: string;
  description: string;
  image: string;
  tag: string;
}

export interface Review {
  name: string;
  rating: number;
  text: string;
  branch: string;
  avatar: string;
}

export interface HealthItem {
  name: string;
  price: string;
  description: string;
  icon: string;
}
