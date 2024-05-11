import { getStore } from '@netlify/blobs';
import { User } from '~/types';

enum BlobStores {
  User = 'users',
  Stories = 'stories',
}

export const createUser = async (user: User & { password: string }) => {
  const store = getStore(BlobStores.User);

  const existingUser = await store.getMetadata(user.email, {
    consistency: 'strong',
  });
  if (existingUser) {
    throw new Error('User already exists');
  }

  // save with email key
  await store.setJSON(user.email, user);

  // also save with id key
  await store.setJSON(user.id, user);
};

export const getUserByEmail = async (email: string) => {
  const store = getStore(BlobStores.User);

  return await store.get(email, { type: 'json' });
};
