export interface Product {
  id: string;
  name: string;
  zone: string;
  zoneLabel: string;
  colorName: string;
  colorHex: string;
  buttonBg: string;
  buttonHoverBg: string;
  lightBg: string;
  price: number;
  originalPrice?: number;
  patchesCount: number;
  description: string;
  actives: string[];
  primaryImage: string;
  secondaryImage: string;
  benefits: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  product: string;
  quote: string;
  highlight: string;
  verified: boolean;
}
