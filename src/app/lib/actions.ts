import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export type State = {
    errors?: {
        brand?: string[];
    };
    message?: string | null;
  };

  const FormSchema = z.object({
  id: z.string(),
  date: z.string(),
  brand: z.string().min(1, "Brand is required"),
  });

  const CreateProduct = FormSchema.omit({ id: true, date: true });

export async function createProduct(prevState: State, formData: FormData) {
    const validatedFields = CreateProduct.safeParse({
    brand: formData.get('brand'),
    });
  
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Create Product.',
      };
    }
    
    const {
        brand,
      } = validatedFields.data;

    const date = new Date().toISOString().split('T')[0];
    try {
        await sql`
          INSERT INTO products (
            brand, size_label, size_waist, size_length, color, fit, material, stretch, 
            measurement_waist, measurement_hip, measurement_front_crotch, 
            measurement_back_crotch, measurement_thigh, measurement_inseam, date
          ) VALUES (${brand}, 'M', '32', '34', 'Blue', 'Slim', 'Cotton', 'Stretchy', 
          '30', '40', '10', '12', '22', '32', ${date}
          )
        `;
      } catch (error) {
        return {
          message: 'Database Error: Failed to Create Product.',
        };
      }

  revalidatePath('/dashboard/produscts');
  redirect('/dashboard/produscts');
  
}
