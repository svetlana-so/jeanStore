'use server';
import { sql } from 'kysely';
/* import { sql } from '@vercel/postgres'; */
import { ProductWithImage } from './definitions';
import { createKysely } from '@vercel/postgres-kysely';
import { Database } from './definitions';
import { getUniqueValues } from './utils';

const db = createKysely<Database>();

// rewrite to kysely
export async function fetchProducts(): Promise<ProductWithImage[]> {
  try {
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
      .groupBy('products.id')
      .execute();

    return data.map((row: any) => ({
      id: row.id,
      brand: row.brand,
      size_label: row.size_label,
      size_waist: row.size_waist,
      size_length: row.size_length,
      color: row.color,
      fit: row.fit,
      material: row.material,
      stretch: row.stretch,
      measurement_hip: row.measurement_hip,
      measurement_front_crotch: row.measurement_front_crotch,
      measurement_back_crotch: row.measurement_back_crotch,
      measurement_thigh: row.measurement_thigh,
      measurement_inseam: row.measurement_inseam,
      price: row.price,
      category: row.category,
      date: row.date,
      in_stock: row.in_stock,
      images: row.images || [],
    }));
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all products.');
  }
}

const ITEMS_PER_PAGE = 6;

export async function fetchProductsByCategory(category: string) {
  try {
    const data = await db
      .selectFrom('products')
      .innerJoin('images', 'images.product_id', 'products.id')
      //@ts-ignore
      .select([
        'products.id',
        'products.brand',
        'products.price',
        sql`json_agg(json_build_object('id', images.id, 'url', images.image_url)) as images`,
      ])
      .where('products.category', '=', category)
      .groupBy('products.id')
      .execute();

    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch products by category.');
  }
}

export async function fetchProductById(id: string) {
  try {
    const product = await db
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
      sql`json_agg(json_build_object('id', images.id, 'url', images.image_url)) as images`
    ])
    .where('products.id', '=', id)
    .groupBy(
      'products.id',
    )
    .executeTakeFirstOrThrow();
    console.log(product);
    return product;
  } catch (error) {
    console.error('Database Error:', error);
    return { message: 'Database Error: Failed to fetch product.' };
  }
}

//use later for filtering with kysely
/* export async function fetchFilteredProducts(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const data = await sql<ProductWithImage>`
      SELECT
      products.id,
      products.brand,
      products.price,
      ARRAY_AGG(json_build_object('id', images.id, 'url', images.image_url)) AS images
      FROM products
      LEFT JOIN images ON products.id = images.product_id
      WHERE
        products.brand ILIKE ${`%${query}%`} OR
        CAST(products.price AS TEXT) ILIKE ${`%${query}%`} OR
      GROUP BY products.id
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    const products = data.rows;
    return products;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch products.');
  }
} */

export async function fetchAllAttributes() {
  try {
    const data = await db
      .selectFrom('products')
      .select([
        'size_label',
        'color',
        'brand',
        'size_waist',
        'size_length',
        'material',
        'stretch',
        'measurement_hip',
        'measurement_front_crotch',
        'measurement_back_crotch',
        'measurement_thigh',
        'measurement_inseam',
      ])
      .execute();

    const uniqSizes = getUniqueValues(data, 'size_label');
    const uniqColors = getUniqueValues(data, 'color');
    const uniqBrands = getUniqueValues(data, 'brand');
    const sizeWaist = getUniqueValues(data, 'size_waist');
    const sizeLength = getUniqueValues(data, 'size_length');
    const materials = getUniqueValues(data, 'material');
    const stretches = getUniqueValues(data, 'stretch');
    const measurementHip = getUniqueValues(data, 'measurement_hip');
    const measurementFrontCrotch = getUniqueValues(
      data,
      'measurement_front_crotch',
    );
    const measurementBackCrotch = getUniqueValues(
      data,
      'measurement_back_crotch',
    );
    const measurementThigh = getUniqueValues(data, 'measurement_thigh');
    const measurementInseam = getUniqueValues(data, 'measurement_inseam');

    return {
      sizes: uniqSizes,
      colors: uniqColors,
      brands: uniqBrands,
      sizeWaist,
      sizeLength,
      materials,
      stretches,
      measurementHip,
      measurementFrontCrotch,
      measurementBackCrotch,
      measurementThigh,
      measurementInseam,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch product attributes.');
  }
}
