import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const client = sanityClient({
  projectId: 'qc3nk3mq',
  dataset: 'production',
  useCdn: true,
});

export function urlFor(source) {
  const builder = imageUrlBuilder(client);
  return builder.image(source);
}

export default client;
