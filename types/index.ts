export interface User {
  id: string;
  email: string;
}

export interface Analysis {
  id: string;
  userId: string;
  query: string;
  result: string;
  createdAt: string;
}
