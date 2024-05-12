import { createStory } from '~/server/blobs';

export default defineEventHandler(async (event) => {
  console.log('incoming create story request');

  const session = await requireUserSession(event);

  const { title, premise, blob } = await readBody(event);
  if (!title || !premise || !blob) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing mandatory title, premise or blob.',
    });
  }

  const slug = `${slugify(title)}-${generateRandomString(4)}`;
  const partId = generateRandomString(6);
  const date = new Date().toISOString();
  const author = {
    id: session.user.id,
    name: session.user.name,
  };

  try {
    await createStory({
      head: {
        slug,
        title,
        premise,
        author,
        createdAt: date,
      },
      blobs: [
        {
          blob,
          id: partId,
          author,
          createdAt: date,
        },
      ],
    });

    return { slug };
  } catch (error) {
    console.log('failed to create story', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create story',
    });
  }
});
