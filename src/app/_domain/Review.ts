export interface ReviewGiven {
  artistID: string;
  rate: number;
  description: string;
  timestamp: number;
}

export interface ReviewReceived {
  userID: string;
  rate: number;
  description: string;
  timestamp: number;
}
