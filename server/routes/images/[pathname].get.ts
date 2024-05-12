import { getImage } from '~/server/blobs';

export default eventHandler(async (event) => {
  const { pathname } = event.context.params || {};

  return getImage(pathname);
});
