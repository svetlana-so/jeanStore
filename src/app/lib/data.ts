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

  export async function fetchProductsByCategoty(category: string) {
    noStore();
    try {
      const data = await sql<ProductWithImage>`
      SELECT
      products.id,
      products.brand,
      products.price,
      ARRAY_AGG(json_build_object('id', images.id, 'url', images.image_url)) AS images
    FROM products
    LEFT JOIN images ON products.id = images.product_id
    WHERE products.category = ${category};
    GROUP BY products.id
      `;
  
      const products = data.rows;
      return products;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch products by category.');
    }
  }

  const ITEMS_PER_PAGE = 6;

  export async function fetchFilteredProducts(
    query: string,
    currentPage: number,
  ) {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    noStore();
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
        products.category ILIKE ${`%${query}%`}
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
  
  export async function fetchProductsPages(query: string) {
    noStore();
    try {
      const count = await sql`SELECT COUNT(*)
      FROM products
      WHERE 
        products.brand ILIKE ${`%${query}%`} OR
        products.price::text ILIKE ${`%${query}%`}
    `;
  
      const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
      return totalPages;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch total number of products.');
    }
  }