import bcrypt from 'bcryptjs';
import { createId } from '@paralleldrive/cuid2';
import { createUser } from '~/server/blobs';

const SALT_ROUNDS = 10;

export async function hashPassword(password: string) {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export default defineEventHandler(async (event) => {
  const { name, email, password } = await readBody(event);
  if (!name || !email || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required fields.',
    });
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  try {
    const date = new Date().toISOString();

    const user = {
      id: createId(),
      name,
      email,
      createdAt: date,
      updatedAt: date,
    };

    await createUser({ ...user, password: hashedPassword });

    await setUserSession(event, {
      user,
    });

    return { created: true };
  } catch (error) {
    console.log('signup failed with error', error);
    throw createError({
      statusCode: 422,
      statusMessage:
        'Signup failed. Please check your information and try again.',
    });
  }
});
