import Story from '~/layouts/story.vue';

export type User = {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type Author = {
  id: string;
  name: string;
};

export type StoryBlob = {
  id: string;
  blob: string;
  author: Author;
  createdAt: string;
};

export type StoryHead = {
  slug: string;
  title: string;
  premise: string;
  author: Author;
  createdAt: string;
};

export type Story = {
  head: StoryHead;
  blobs: StoryBlob[];
};
