import {ReviewGiven, ReviewReceived} from './Review';
import {Highlight} from './Highlight';
import {Gig} from './Gig';
import {Course} from './Course';

export interface User {
  uid: string;
  name: string;
  handler: string;
  avatar?: string;
  following?: number;
  followers?: number;
  location?: string;
  joiningTimestamp: number;
  socialLinks?: { network: string, link: string }[];
  reviewsGiven?: ReviewGiven[];
  interests: string[];
  title?: string;
  artisticAreas?: string[];
  bio?: string;
  skills?: string[];
  highlights?: Highlight[];
  reviewsReceived?: ReviewReceived[];
  portfolio?: string[];
  gigs?: Gig[];
  courses?: Course[];
  balance?: number;
  moneyEarned?: number;
  schedule?: any;
  relevance?: number;
  popularity?: number;
  type: string;
}
