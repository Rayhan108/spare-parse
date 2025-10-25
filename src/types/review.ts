export interface User {
  fullName: string;
  image?: string;
}

export interface Review {
  id: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: string;
  user?: User; // optional user info
}