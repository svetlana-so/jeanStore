'use server';

import { sql } from '@vercel/postgres';
import { ProductWithImage } from './definitions';
import { createKysely } from '@vercel/postgres-kysely';
import { Database } from './definitions';
import { getUniqueValues } from './utils';

const db = createKysely<Database>();

// rewrite to kysely
export async function fetchProducts() {
  try {
    const data = await sql<ProductWithImage>`
      SELECT
      products.id,
      products.brand,
      products.price,
      ARRAY_AGG(json_build_object('id', images.id, 'url', images.image_url)) AS images
    FROM products
    LEFT JOIN images ON products.id = images.product_id
    GROUP BY products.id
      `;

    const products = data.rows;
    return products;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all products.');
  }
}

const ITEMS_PER_PAGE = 6;

export async function fetchProductsByCategory(category: string) {
  try {
    const data = await sql<ProductWithImage>`
      SELECT
      products.id,
      products.brand,
      products.price,
      ARRAY_AGG(json_build_object('id', images.id, 'url', images.image_url)) AS images
    FROM products
    LEFT JOIN images ON products.id = images.product_id
    WHERE products.category = ${category}
    GROUP BY products.id
      `;
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch products by category.');
  }
}

//use later for filtering?
export async function fetchFilteredProducts(
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
}
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
