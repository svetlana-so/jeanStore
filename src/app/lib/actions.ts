'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
/* import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation'; */

const schema = z.object({
  brand: z.string(),
  price: z.number(),
  category: z.string()
});

export type FormFields = z.infer<typeof schema>;

export async function createProduct(data: FormFields) {
  const date = new Date().toISOString().split('T')[0];

  try {
    const result = await sql`
      INSERT INTO products (
        brand, size_label, size_waist, size_length, color, fit, material, stretch, 
        measurement_waist, measurement_hip, measurement_front_crotch, 
        measurement_back_crotch, measurement_thigh, measurement_inseam, price, category, date
      ) VALUES (
        ${data.brand}, 'M', '32', '34', 'Blue', 'Slim', 'Cotton', 'Stretchy', 
        '30', '40', '10', '12', '22', '32', ${data.price}, ${data.category}, ${date}
      )
      RETURNING id;
    `;
    const productId = result && result.rows.length > 0 ? result.rows[0].id : null;
    return { success: true, productId  };
  } catch (error) {
    console.error('Database Error:', error);
    return { success: false, message: 'Database Error: Failed to Create Product.' };
  }
}



export async function createImages(urls: string[], productId: string) {
  try {
    for (const url of urls) {
      await sql`
      INSERT INTO images (
        image_url, product_id
      ) VALUES (
        ${url}, ${productId}
      )
    `;
    }
    
    return { success: true };
  } catch (error) {
    console.error('Database Error:', error);
    return { success: false, message: 'Database Error: Failed to Create Images.' };
  }
}
