import {ReviewReceived} from './Review';

export interface Course {
  id: string;
  name: string;
  category: string;
  pitch: string;
  description: string;
  duration: string;
  list?: string[];
  price: number;
  imagesURL: string[];
  rate?: number;
  timesSold: number;
  timestamp: number;
  artistID: string;
  reviews?: ReviewReceived[];
}
