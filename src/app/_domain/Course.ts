export interface Course {
  id: number;
  name: string;
  pitch: string;
  description: string;
  duration: string;
  list?: string[];
  price: number;
  imagesURL: string[];
  rate?: number;
}
