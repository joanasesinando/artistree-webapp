export interface Gig {
  id: string;
  name: string;
  category: string;
  pitch: string;
  description: string;
  list?: string[];
  price: number;
  imagesURL: string[];
  rate?: number;
  timesSold: number;
  timestamp: number;
}
