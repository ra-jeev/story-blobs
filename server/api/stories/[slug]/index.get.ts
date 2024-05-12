import { getStoryBySlug } from '~/server/blobs';

export default defineEventHandler(async (event) => {
  const { slug } = event.context.params || {};
  console.log('incoming get story request for slug', slug);

  return await getStoryBySlug(slug);
});
