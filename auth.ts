import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
/* import { authConfig } from './auth.config'; */
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import type { User } from '@/app/lib/definitions';
import bcrypt from 'bcrypt';
import { SignJWT, jwtVerify } from 'jose';

const secret = process.env.AUTH_SECRET;
const key = new TextEncoder().encode(secret);

export async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    throw new Error('Failed to fetch user.');
  }
}
export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('10s')
    .sign(key);
}

export async function signIn(data: any) {
  const parsedCredentials = z
    .object({ email: z.string().email(), password: z.string().min(6) })
    .safeParse(data);

  if (!parsedCredentials.success) {
    throw new Error('Wrong credentials');
  }

  const { email, password } = parsedCredentials.data;
  const user = await getUser(email);

  if (!user || !(await bcrypt.compare(password, user.password)) || user.role !== 'Admin') {
    throw new Error('Wrong credentials');
  }

  return user;
}
