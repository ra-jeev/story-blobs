import { deleteAll, deleteStoryBySlug, getStoryBySlug } from '~/server/blobs';

export default defineEventHandler(async (event) => {
  const { slug } = event.context.params || {};
  console.log('incoming get story request for slug', slug);

  // await deleteAll();

  await deleteStoryBySlug('stardust-and-luna-ce51');

  const story = await getStoryBySlug(slug);

  return { story };
});

[
  'In a distant galaxy, a brilliant feline astrophysicist uncovers a cataclysmic threat to her planet, setting her on a perilous journey to save her species from extinction.',
  'It was a clear evening, the stars hanging above the domed skyline like uncountable celestial fireflies, in the city of Stardust, the most luminous metropolis on the planet of Felinia. On the rooftop of one of the tallest buildings in the city, a sleek, silver-furred feline named Dr. Luna was curled up on a cushioned lounger, her emerald-green eyes trained on the celestial tapestry above.',
];
