export interface ReviewGiven {
  artistID: string;
  rate: number;
  description: string;
  timestamp: number;
  type: string;
  typeID: number;
}

export interface ReviewReceived {
  userID: string;
  rate: number;
  description: string;
  timestamp: number;
  type: string;
  typeID: number;
}
