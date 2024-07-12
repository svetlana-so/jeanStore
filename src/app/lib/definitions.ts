import { Generated } from 'kysely';

export interface ProductTable {
  id: Generated<string>;
  brand: string;
  size_label: string;
  size_waist: string;
  size_length: string;
  color: string;
  fit: string;
  material: string;
  stretch: string;
  measurement_waist: number;
  measurement_hip: number;
  measurement_front_crotch: number;
  measurement_back_crotch: number;
  measurement_thigh: number;
  measurement_inseam: number;
  price: number;
  category: string;
  date: string;
}

export interface ImageTable {
  id: Generated<string>;
  product_id: string;
  image_url: string;
}

export interface UserTable {
  id: Generated<string>;
  name: string;
  email: string;
}

export interface Database {
  products: ProductTable;
  users: UserTable;
  images: ImageTable;
}

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
