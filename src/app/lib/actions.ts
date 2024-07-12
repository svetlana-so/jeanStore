'use server';
import { createKysely } from '@vercel/postgres-kysely';
import { z } from 'zod';
import { Database } from './definitions';

const schema = z.object({
  brand: z.string().toUpperCase(),
  price: z.number(),
  category: z.string(),
});

export type FormFields = z.infer<typeof schema>;

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
