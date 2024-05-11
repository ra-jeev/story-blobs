import bcrypt from 'bcryptjs';
import { getUserByEmail } from '~/server/blobs';
import type { User } from '~/types';

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event);
  if (!email || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required fields.',
    });
  }

  const dbUser = await getUserByEmail(email);
  if (!dbUser) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid email or password.',
    });
  }

  const passwordsMatch = await bcrypt.compare(password, dbUser.password);
  if (!passwordsMatch) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid email or password',
    });
  }

  const user = { ...dbUser, password: undefined };
  await setUserSession(event, { user });

  return user;
});
