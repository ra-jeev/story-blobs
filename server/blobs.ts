import { getStore, listStores } from '@netlify/blobs';
import { Story, User } from '~/types';

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

export const createStory = async (story: Story) => {
  const store = getStore(BlobStores.Stories);

  console.log('writing the head:', story.head);
  await store.setJSON(story.head.slug, story.head);
  console.log('writing the first blob:', story.blobs[0]);
  const blobKey = `${story.head.slug}/${story.blobs[0].id}`;
  console.log('blobKey:', blobKey);
  await store.setJSON(blobKey, story.blobs[0]);
};

export const getStoryBySlug = async (slug: string) => {
  const store = getStore(BlobStores.Stories);

  console.log('all blobs in store:', await store.list({ directories: true }));

  return await store.get(slug, { type: 'json' });
};

export const getAllStories = async () => {
  const store = getStore(BlobStores.Stories);

  const allRes = await store.list();
  const dirRes = await store.list({ directories: true });

  return { all: allRes, dirs: dirRes };
};

export const deleteStoryBySlug = async (slug: string) => {
  const store = getStore(BlobStores.Stories);

  await store.delete(slug);
};

export const deleteAll = async () => {
  const store = getStore(BlobStores.Stories);
  const items = await store.list();

  for (const item of items.blobs) {
    await store.delete(item.key);
  }
};
