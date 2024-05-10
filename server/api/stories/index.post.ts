import { getStore } from '@netlify/blobs';

export default defineEventHandler(async (event) => {
  console.log('incoming create story request');

  const { title, premise, blob } = await readBody(event);
  if (!title || !premise || !blob) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing mandatory title, premise or blob.',
    });
  }

  console.log('title:', title);
  console.log('premise', premise);
  console.log('blob', blob);

  return { message: 'ok' };
});
