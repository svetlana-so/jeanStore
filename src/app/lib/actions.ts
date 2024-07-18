'use server';
/* import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation'; */
import { createKysely } from '@vercel/postgres-kysely';
import { z } from 'zod';
import { Database } from './definitions';
import { signIn, encrypt } from '@/../../auth';
import { cookies } from 'next/headers';
import { FormFields } from './definitions';
import { select } from '@nextui-org/theme';


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

export async function fetchProductById(id: string) {
  try {
    const product = await db.selectFrom('products')
      .selectAll()
      .where('id', '=', id)
      .executeTakeFirstOrThrow();
console.log(product)
    return product;
  } catch (error) {
    console.error('Database Error:', error);
    return { message: 'Database Error: Failed to fetch product.' };
  }
}

export async function updateProduct(id: string,
  formData: FormData,) {
    /* const { ... } = formData
    try {
      await db
      .updateTable('products')
      .set({
        
      })
      .where('id', '=', id)
      .executeTakeFirst()
    } catch (error) {
      return { message: 'Database Error: Failed to Update Product.' };
    }
   
    revalidatePath('/dashboard/products');
    redirect('/dashboard/products'); */
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
