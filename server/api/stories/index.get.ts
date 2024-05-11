import { getAllStories } from '~/server/blobs';

export default defineEventHandler(async (event) => {
  return await getAllStories();
});
