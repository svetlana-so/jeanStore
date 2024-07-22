'use server';
import { sql } from 'kysely';
import { createKysely } from '@vercel/postgres-kysely';
import { z } from 'zod';
import { Database } from './definitions';
import { signIn, encrypt } from '@/../../auth';
import { cookies } from 'next/headers';
import { FormFields } from './definitions';
import { ProductWithImage, Image } from './definitions';

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

export async function updateProduct(id: string, updatedProduct: Partial<ProductWithImage>): Promise<ProductWithImage | null> {
  try {
    
    await db
      .updateTable('products')
      .set(updatedProduct)
      .where('id', '=', id)
      .execute();

    
    const data = await db
      .selectFrom('products')
      .innerJoin('images', 'images.product_id', 'products.id')
      //@ts-ignore
      .select([
        'products.id',
        'products.brand',
        'products.size_label',
        'products.size_waist',
        'products.size_length',
        'products.color',
        'products.fit',
        'products.material',
        'products.stretch',
        'products.measurement_hip',
        'products.measurement_front_crotch',
        'products.measurement_back_crotch',
        'products.measurement_thigh',
        'products.measurement_inseam',
        'products.price',
        'products.category',
        'products.date',
        'products.in_stock',
        sql`json_agg(json_build_object('id', images.id, 'url', images.image_url)) as images`,
      ])
      .where('products.id', '=', id)
      .groupBy('products.id')
      .executeTakeFirstOrThrow();

    const product: ProductWithImage = {
      ...data,
      images: data.images as unknown as Image[],
    };

    return product;
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
