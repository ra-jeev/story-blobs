import { addToStory } from '~/server/blobs';

export default defineEventHandler(async (event) => {
  const { slug } = event.context.params || {};
  console.log('incoming story patch request for id:', slug);

  const session = await requireUserSession(event);

  const { blob } = await readBody(event);
  if (!blob) {
    throw createError({ statusCode: 400, statusMessage: 'No blob provided' });
  }

  const partId = generateRandomString(6);
  const date = new Date().toISOString();
  const author = {
    id: session.user.id,
    name: session.user.name,
  };

  await addToStory(slug, { id: partId, createdAt: date, author, blob });

  return {
    updated: true,
  };
});
