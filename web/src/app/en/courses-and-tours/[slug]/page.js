import Container from '@/components/container'
import Hero from '@/components/Hero-new'
import BlockContent from '@/components/block-content-new'
import { getTourBySlug, getAllTours, imageUrlFor } from '@/lib/sanity'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const tours = await getAllTours()
  
  return tours
    .filter(tour => tour.slug?.en?.current)
    .map((tour) => ({
      slug: tour.slug.en.current,
    }))
}

export async function generateMetadata({ params }) {
  const tour = await getTourBySlug(params.slug, 'en')
  
  if (!tour) {
    return {}
  }
  
  return {
    title: `${tour.title?.en || ''} - Kystleik`,
    description: tour.description?.en,
  }
}

export default async function TourPage({ params }) {
  const tour = await getTourBySlug(params.slug, 'en')
  
  if (!tour) {
    notFound()
  }
  
  const locale = 'en'
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
