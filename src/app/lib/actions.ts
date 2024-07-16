'use server';
import { createKysely } from '@vercel/postgres-kysely';
import { z } from 'zod';
import { Database } from './definitions';
import { signIn, encrypt } from '@/../../auth';
import { cookies } from 'next/headers';

const schema = z.object({
  brand: z.string().min(1, 'Brand is required'),
  price: z.number().min(0, 'Price must be a positive number'),
  category: z.string(),
});
export type FormFields = z.infer<typeof schema>;

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required'),
  password: z.string().min(8, 'Password is required'),
});
export type LoginFormFields = z.infer<typeof loginSchema>;

const db = createKysely<Database>();

export async function createProduct(data: FormFields) {
  const date = new Date().toISOString().split('T')[0];

  try {
    const result = await db
      .insertInto('products')
      .values({
        brand: data.brand,
        size_label: 'M',
        size_waist: '32',
        size_length: '34',
        color: 'Blue',
        fit: 'Slim',
        material: 'Cotton',
        stretch: 'Stretchy',
        measurement_waist: 30,
        measurement_hip: 40,
        measurement_front_crotch: 10,
        measurement_back_crotch: 12,
        measurement_thigh: 22,
        measurement_inseam: 32,
        price: data.price,
        category: data.category,
        date: date,
        in_stock: true,
      })
      .returning('id')
      .executeTakeFirstOrThrow();

    return { success: true, productId: result.id };
  } catch (error) {
    console.error('Database Error:', error);
    return {
      success: false,
      message: 'Database Error: Failed to Create Product.',
    };
  }
}

export async function createImages(urls: string[], productId: string) {
  try {
    const insertPromises = urls.map((url) =>
      db
        .insertInto('images')
        .values({
          image_url: url,
          product_id: productId,
        })
        .execute(),
    );
    await Promise.all(insertPromises);
    return { success: true };
  } catch (error) {
    console.error('Database Error:', error);
    return {
      success: false,
      message: 'Database Error: Failed to Create Images.',
    };
  }
}

export async function authenticate(data: LoginFormFields) {
  try {
    const admin = await signIn(data);
    
    const expires = new Date(Date.now() + 10 * 1000);
    const session = await encrypt({ admin, expires });

    cookies().set('JeansSession', session, { expires, httpOnly: true });
  } catch (error: any) {
    throw new Error(error.message || 'Error logging in');
  }
}