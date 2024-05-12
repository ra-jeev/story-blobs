import { createId } from '@paralleldrive/cuid2';
import { saveImage } from '~/server/blobs';

export default defineEventHandler(async (event) => {
  console.log('incoming upload image request');

  const session = await requireUserSession(event);

  const formData = await readFormData(event);
  const file = formData.get('file') as File;
  console.log('incoming file', file);
  if (!file.type.startsWith('image/')) {
    throw createError({
      statusCode: 400,
      message: 'Invalid file type',
    });
  }

  const extension = file.name.split('.').pop();
  const fileName = `${createId()}.${extension}`;

  await saveImage(fileName, file);

  return { fileName };
});
