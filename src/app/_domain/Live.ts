import {LivePost} from './LivePost';

export interface Live {
  id: string;
  free: boolean;
  artistID: string;
  name: string;
  tags: string[];
  thumbnail: string;
  link: string;
  posts?: LivePost[]
}
