export default defineEventHandler(async (event) => {
  const { id } = event.context.params || {};
  console.log('incoming story patch request for id:', id);

  const { blob } = await readBody(event);
  if (!blob) {
    throw createError({ statusCode: 400, statusMessage: 'No blob provided' });
  }

  console.log('blob: ', blob);

  return {
    message: 'patch story endpoint',
  };
});
