import { getStore } from '@netlify/blobs';
import { Story, StoryBlob, User } from '~/types';

enum BlobStores {
  User = 'users',
  Stories = 'stories',
  Images = 'images',
}

const SEPARATOR = process.env.NODE_ENV === 'development' ? '~' : '/';

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

  await store.setJSON(story.head.slug, story.head);

  const blobKey = `${story.head.slug}${SEPARATOR}${story.blobs[0].id}`;

  await store.setJSON(blobKey, story.blobs[0]);
};

export const addToStory = async (slug: string, blob: StoryBlob) => {
  const store = getStore(BlobStores.Stories);

  const blobKey = `${slug}${SEPARATOR}${blob.id}`;

  await store.setJSON(blobKey, blob);
};

export const getStoryBySlug = async (slug: string) => {
  const store = getStore(BlobStores.Stories);

  let head;
  const parts = [];
  const { blobs } = await store.list({ prefix: slug });

  for (const blob of blobs) {
    const part = await store.get(blob.key, { type: 'json' });
    if (part.slug) {
      head = part;
    } else {
      parts.push(part);
    }
  }

  return {
    head,
    blobs: parts,
  };
};

export const getAllStories = async () => {
  const store = getStore(BlobStores.Stories);

  const { blobs } = await store.list({ directories: true });
  const promises = [];
  for (const blob of blobs) {
    promises.push(store.get(blob.key, { type: 'json' }));
  }

  const stories = await Promise.all(promises);
  stories.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));
  return stories;
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

export const saveImage = async (key: string, file: File) => {
  const store = getStore(BlobStores.Images);

  return await store.set(key, file);
};

export const getImage = (key: string) => {
  const store = getStore(BlobStores.Images);

  return store.get(key, { type: 'blob' });
};
