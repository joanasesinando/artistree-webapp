export interface Gig {
  id: number;
  name: string;
  pitch: string;
  description: string;
  list?: string[];
  price: number;
  imagesURL: string[];
  rate?: number;
}
