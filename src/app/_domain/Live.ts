import {LivePost} from './LivePost';
import {User} from './User';

export interface Live {
  id: string;
  free: boolean;
  artistID: string;
  artist?: User;
  name: string;
  tags: string[];
  thumbnail: string;
  link: string;
  posts?: LivePost[];
}
