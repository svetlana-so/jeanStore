import { Generated } from 'kysely';
import {z} from 'zod'

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
  measurement_hip: number;
  measurement_front_crotch: number;
  measurement_back_crotch: number;
  measurement_thigh: number;
  measurement_inseam: number;
  price: number;
  category: string;
  date: string;
  in_stock: boolean;
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
  role: boolean;
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
  sizeLabel: string; 
  waist: string;
  length: string;
  color: string;
  fit: string;
  material: string;
  stretch: string;
  hipMeasurement: number;
  frontCrotchMeasurement: number;
  backCrotchMeasurement: number;
  thighMeasurement: number;
  inseamMeasurement: number;
  price: number;
  category: string;
  date: string;
  in_stock?: boolean;
};


export type Image = {
  id: string;
  url: string;
};

export interface ProductWithImage extends Product {
  images: Image[];
}


export const schema = z.object({
  brand: z.string().min(1),
  sizeLabel: z.string(),
  waist: z.string().min(1),
  length: z.string().min(1),
  color: z.string().min(1),
  fit: z.string().min(1),
  material: z.string().min(1),
  stretch: z.string().min(1),
  hipMeasurement: z.number(),
  frontCrotchMeasurement: z.number(),
  backCrotchMeasurement: z.number(),
  thighMeasurement: z.number(),
  inseamMeasurement: z.number(),
  price: z.number(),
  category: z.string(),
  date: z.date().optional(),
  in_stock: z.boolean().optional(),
});

export type FormFields = z.infer<typeof schema>;