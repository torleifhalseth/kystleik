import Container from '@/components/container'
import Hero from '@/components/Hero-new'
import BlockContent from '@/components/block-content-new'
import { getPageBySlug, getAllPages, imageUrlFor } from '@/lib/sanity'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const pages = await getAllPages()
  
  return pages
    .filter(page => page.slug?.en?.current && page.slug.en.current !== 'index')
    .map((page) => ({
      slug: page.slug.en.current,
    }))
}

export async function generateMetadata({ params }) {
  const page = await getPageBySlug(params.slug, 'en')
  
  if (!page) {
    return {}
  }
  
  return {
    title: `${page.title?.en || ''} - Kystleik`,
    description: page.description?.en,
  }
}

export default async function Page({ params }) {
  const page = await getPageBySlug(params.slug, 'en')
  
  if (!page) {
    notFound()
  }
  
  const locale = 'en'
  const body = page.body?.[locale]
  
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
  )
}
