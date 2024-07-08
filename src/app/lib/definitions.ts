export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  status: 'pending' | 'paid';
};

export type User = {
  id: string;
  role: string;
  email: string;
  password: string;
};

export type Product = {
  id: string;
  brand: string;
  //...
  date: string;
};

export type Image = {
  id: string;
  url: string;
};

export interface ProductWithImage {
  id: number;
  brand: string;
  price: number;
  images: Image[];
}
