'use server';
import { sql } from 'kysely';
import { createKysely } from '@vercel/postgres-kysely';
import { z } from 'zod';
import { Database, Product } from './definitions';
import { signIn, encrypt } from '../../../auth';
import { cookies } from 'next/headers';
import { FormFields } from './definitions';


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
        size_label: data.sizeLabel,
        size_waist: data.waist,
        size_length: data.length,
        color: data.color,
        fit: data.fit,
        material: data.material,
        stretch: data.stretch,
        measurement_hip: data.hipMeasurement,
        measurement_front_crotch: data.frontCrotchMeasurement,
        measurement_back_crotch: data.backCrotchMeasurement,
        measurement_thigh: data.thighMeasurement,
        measurement_inseam: data.inseamMeasurement,
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

export async function updateProduct(id: string, updatedProduct: Partial<Product>): Promise<void> {
  try {
    await db
      .updateTable('products')
      .set({
        brand: updatedProduct.brand,
        size_label: updatedProduct.size_label,
        size_waist: updatedProduct.size_waist,
        size_length: updatedProduct.size_length,
        color: updatedProduct.color,
        fit: updatedProduct.fit,
        material: updatedProduct.material,
        stretch: updatedProduct.stretch,
        measurement_hip: updatedProduct.measurement_hip,
        measurement_front_crotch: updatedProduct.measurement_front_crotch,
        measurement_back_crotch: updatedProduct.measurement_back_crotch,
        measurement_thigh: updatedProduct.measurement_thigh,
        measurement_inseam: updatedProduct.measurement_inseam,
        price: updatedProduct.price,
        category: updatedProduct.category,
        date: updatedProduct.date,
        in_stock: updatedProduct.in_stock,
      })
      .where('id', '=', id)
      .execute();
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to update product.');
  }
}

export async function deleteProduct(id: string) {
  try {
    // Create an array of promises
    const promises = [
      db.deleteFrom('images').where('product_id', '=', id).execute(),
      db.deleteFrom('products').where('id', '=', id).execute(),
    ];

    await Promise.all(promises);

    console.log(
      `Product and associated pictures with ID ${id} have been deleted.`,
    );
  } catch (err) {
    console.error('Error deleting product and/or pictures:', err);
    throw new Error('Failed to delete product and/or its associated pictures.');
  }
}

export async function authenticate(data: LoginFormFields) {
  try {
    const admin = await signIn(data);

    const expires = new Date(Date.now() + 30 * 60 * 1000);
    const session = await encrypt({ admin, expires });

    cookies().set('JeansSession', session, { expires, httpOnly: true });
  } catch (error: any) {
    throw new Error(error.message || 'Error logging in');
  }
}

export async function logout() {
  cookies().set('JeansSession', '', { expires: new Date(0) });
}
