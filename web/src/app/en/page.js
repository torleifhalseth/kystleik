import { getSiteSettings, getAllTours } from '@/lib/sanity'
import { imageUrlFor } from '@/lib/sanity'
import Container from '@/components/container'
import Hero from '@/components/Hero'
import ProjectPreviewGrid from '@/components/project-preview-grid'
import RichResult from '@/components/RichResult'

export async function generateMetadata() {
  const site = await getSiteSettings()
  
  return {
    title: site?.title || 'Kystleik',
    description: site?.description,
    keywords: site?.keywords,
  }
}

export default async function HomePage() {
  const site = await getSiteSettings()
  const tours = await getAllTours()
  
  const browseMoreHref = '/en/courses-and-tours/'
  const tourNodesInEnglish = tours
    .filter(tour => tour.slug?.en?.current)
    .map((tour) => ({
      slug: `${browseMoreHref}${tour.slug.en.current}/`,
      mainImage: tour.mainImage,
      title: tour.title?.en || '',
      _rawExcerpt: tour._rawExcerpt,
    }))

  return (
    <>
      <RichResult />
      {site?.mainImage && (
        <Hero
          width="100%"
          src={imageUrlFor(site.mainImage).width(1800).url()}
          alt={site.mainImage?.alt?.en}
        />
      )}
      <Container>
        <h1 style={{ visibility: 'hidden' }}>{site?.title}</h1>
        <h2>Courses and Tours</h2>
        {tourNodesInEnglish && tourNodesInEnglish.length > 0 && (
          <ProjectPreviewGrid
            nodes={tourNodesInEnglish}
            browseMoreHref={browseMoreHref}
            locale="en"
          />
        )}
      </Container>
    </>
  )
}
