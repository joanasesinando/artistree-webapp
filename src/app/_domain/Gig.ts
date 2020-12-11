export interface Gig {
  id: string;
  name: string;
  pitch: string;
  description: string;
  list?: string[];
  price: number;
  imagesURL: string[];
  rate?: number;
}
