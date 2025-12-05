import Container from '@/components/container'
import Hero from '@/components/Hero'
import BlockContent from '@/components/block-content'
import { getTourBySlug, getAllTours, imageUrlFor } from '@/lib/sanity'
import { notFound } from 'next/navigation'

export const dynamic = 'force-static'
export const dynamicParams = true

export async function generateStaticParams() {
  const tours = await getAllTours()
  
  return tours
    .filter(tour => tour.slug?.nb?.current)
    .map((tour) => ({
      slug: tour.slug.nb.current,
    }))
}

export async function generateMetadata({ params }) {
  const tour = await getTourBySlug(params.slug, 'nb')
  
  if (!tour) {
    return {}
  }
  
  return {
    title: `${tour.title?.nb || ''} - Kystleik`,
    description: tour.description?.nb,
  }
}

export default async function TourPage({ params }) {
  const tour = await getTourBySlug(params.slug, 'nb')
  
  if (!tour) {
    notFound()
  }
  
  const locale = 'nb'
  const body = tour.body?.[locale]
  
  return (
    <>
      {tour.mainImage && (
        <Hero
          src={imageUrlFor(tour.mainImage).url()}
          alt={tour.mainImage?.alt?.[locale]}
        />
      )}
      <Container>
        <h1>{tour.title?.[locale]}</h1>
        {body && <BlockContent blocks={body} />}
      </Container>
    </>
  )
}
