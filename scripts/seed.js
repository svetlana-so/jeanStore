import { createKysely } from '@vercel/postgres-kysely';
const { users } = require('../src/app/lib/placeholder-data');
const bcrypt = require('bcrypt');

const db = createKysely();

async function seedUsers() {
  try {
    await db.raw`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "users" table if it doesn't exist
    await db.schema.createTableIfNotExists('users', (table) => {
      table.uuid('id').defaultTo(db.raw('uuid_generate_v4()')).primary();
      table.string('role', 255).notNullable();
      table.text('email').notNullable().unique();
      table.text('password').notNullable();
    });

    console.log(`Created "users" table`);

    // Insert data into the "users" table
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return db
          .insertInto('users')
          .values({
            id: user.id,
            role: user.role,
            email: user.email,
            password: hashedPassword,
          })
          .onConflict('id')
          .doNothing()
          .execute();
      }),
    );

    console.log(`Seeded ${insertedUsers.length} users`);

    return {
      createTable: true,
      users: insertedUsers,
    };
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

async function seedProducts() {
  try {
    await db.raw`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "products" table if it doesn't exist
    await db.schema.createTableIfNotExists('products', (table) => {
      table.uuid('id').defaultTo(db.raw('uuid_generate_v4()')).primary();
      table.string('brand', 255).notNullable();
      table.string('size_label', 255).notNullable();
      table.string('size_waist', 255).notNullable();
      table.string('size_length', 255).notNullable();
      table.string('color', 255).notNullable();
      table.string('fit', 255).notNullable();
      table.string('material', 255).notNullable();
      table.string('stretch', 255).notNullable();
      table.float('measurement_hip').notNullable();
      table.float('measurement_front_crotch').notNullable();
      table.float('measurement_back_crotch').notNullable();
      table.float('measurement_thigh').notNullable();
      table.float('measurement_inseam').notNullable();
      table.decimal('price', 10, 2).notNullable();
      table.string('category', 255).notNullable();
      table.date('date').defaultTo(db.raw('CURRENT_DATE'));
      table.boolean('in_stock');
    });

    console.log(`Created "products" table`);

    return {
      createTable: true,
    };
  } catch (error) {
    console.error('Error seeding products:', error);
    throw error;
  }
}

async function seedImages() {
  try {
    await db.raw`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "images" table if it doesn't exist
    await db.schema.createTableIfNotExists('images', (table) => {
      table.uuid('id').defaultTo(db.raw('uuid_generate_v4()')).primary();
      table.uuid('product_id').notNullable().references('products.id');
      table.string('image_url', 255).notNullable();
    });

    console.log(`Created "images" table`);

    return {
      createTable: true,
    };
  } catch (error) {
    console.error('Error seeding images:', error);
    throw error;
  }
}

async function main() {
  try {
    await db.connect();

    await seedUsers();
    await seedProducts();
    await seedImages();

    console.log('Database seeding completed successfully');
  } catch (error) {
    console.error(
      'An error occurred while attempting to seed the database:',
      error,
    );
  } finally {
    await db.end();
  }
}

main();
