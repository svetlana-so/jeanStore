'use server';

import { sql } from '@vercel/postgres';
import { ProductWithImage } from './definitions';

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
