import Container from '@/components/container';
import Hero from '@/components/Hero';
import BlockContent from '@/components/block-content';
import { getPageBySlug, getAllPages, imageUrlFor } from '@/lib/sanity';
import { notFound } from 'next/navigation';

export const dynamic = 'force-static';
export const dynamicParams = true;

export async function generateStaticParams() {
  const pages = await getAllPages();

  return pages
    .filter(
      (page) => page.slug?.nb?.current && page.slug.nb.current !== 'index',
    )
    .map((page) => ({
      slug: page.slug.nb.current,
    }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = await getPageBySlug(slug, 'nb');

  if (!page) {
    return {};
  }

  return {
    title: `${page.title?.nb || ''} - Kystleik`,
    description: page.description?.nb,
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const page = await getPageBySlug(slug, 'nb');

  if (!page) {
    notFound();
  }

  const locale = 'nb';
  const body = page.body?.[locale];

  return (
    <>
      {page.mainImage && (
        <Hero
          src={imageUrlFor(page.mainImage).url()}
          alt={page.mainImage?.alt?.[locale]}
        />
      )}
      <Container>
        <h1>{page.title?.[locale]}</h1>
        {body && <BlockContent blocks={body} />}
      </Container>
    </>
  );
}
