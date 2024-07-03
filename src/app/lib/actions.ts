'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
/* import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation'; */

const schema = z.object({
  brand: z.string().min(2),
});

export type FormFields = z.infer<typeof schema>;

export async function createProduct(data: FormFields) {
  const date = new Date().toISOString().split('T')[0];

  try {
    await sql`
      INSERT INTO products (
        brand, size_label, size_waist, size_length, color, fit, material, stretch, 
        measurement_waist, measurement_hip, measurement_front_crotch, 
        measurement_back_crotch, measurement_thigh, measurement_inseam, date
      ) VALUES (
        ${data.brand}, 'M', '32', '34', 'Blue', 'Slim', 'Cotton', 'Stretchy', 
        '30', '40', '10', '12', '22', '32', ${date}
      )
    `;
    return { success: true };
  } catch (error) {
    console.error('Database Error:', error);
    return { success: false, message: 'Database Error: Failed to Create Product.' };
  }
}
