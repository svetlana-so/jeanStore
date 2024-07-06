const { db } = require('@vercel/postgres');
const { users } = require('../src/app/lib/placeholder-data');
const bcrypt = require('bcrypt');

async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        role VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `;

    console.log(`Created "users" table`);

    // Insert data into the "users" table
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
        INSERT INTO users (id, role, email, password)
        VALUES (${user.id}, ${user.role}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedUsers.length} users`);

    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

async function seedProducts(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS products (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    brand VARCHAR(255) NOT NULL,
    size_label VARCHAR(255) NOT NULL,
    size_waist VARCHAR(255) NOT NULL,
    size_length VARCHAR(255) NOT NULL,
    color VARCHAR(255) NOT NULL,
    fit VARCHAR(255) NOT NULL,
    material VARCHAR(255) NOT NULL,
    stretch VARCHAR(255) NOT NULL,
    measurement_waist FLOAT NOT NULL,
    measurement_hip FLOAT NOT NULL,
    measurement_front_crotch FLOAT NOT NULL,
    measurement_back_crotch FLOAT NOT NULL,
    measurement_thigh FLOAT NOT NULL,
    measurement_inseam FLOAT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    category VARCHAR(255) NOT NULL,
    date DATE DEFAULT CURRENT_DATE
    );
    `;
    console.log(`Created "products" table`);

    return {
      createTable,
    };
  } catch (error) {
    console.error('Error seeding invoices:', error);
    throw error;
  }
}

async function seedImages(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "invoices" table if it doesn't exist
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS images (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    product_id UUID NOT NULL
    REFERENCES products(id),
    image_url VARCHAR(255) NOT NULL
  );
`;

    console.log(`Created "invoices" table`);

    return {
      createTable,
    };
  } catch (error) {
    console.error('Error seeding invoices:', error);
    throw error;
  }
}

async function seedInvoices(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "invoices" table if it doesn't exist
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS invoices (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    customer_id UUID NOT NULL
    REFERENCES users(id),
    amount INT NOT NULL,
    status VARCHAR(255) NOT NULL,
    date DATE DEFAULT CURRENT_DATE
  );
`;

    console.log(`Created "invoices" table`);

    return {
      createTable,
    };
  } catch (error) {
    console.error('Error seeding invoices:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedUsers(client);
  await seedInvoices(client);
  await seedProducts(client)
  await seedImages(client)
  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
