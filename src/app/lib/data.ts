import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';
import {ProductWithImage } from './definitions';


export async function fetchProducts() {
    noStore();
    try {
      const data = await sql<ProductWithImage>`
      SELECT
      products.id,
      products.brand,
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