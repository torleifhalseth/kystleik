import { getSiteSettings, getAllTours } from '@/lib/sanity'
import { imageUrlFor } from '@/lib/sanity'
import Container from '@/components/container'
import Hero from '@/components/Hero-new'
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
  
  const browseMoreHref = '/no/kurs-og-aktiviteter/'
  const tourNodesInNorwegian = tours
    .filter(tour => tour.slug?.nb?.current)
    .map((tour) => ({
      slug: `${browseMoreHref}${tour.slug.nb.current}/`,
      mainImage: tour.mainImage,
      title: tour.title?.nb || '',
      _rawExcerpt: tour._rawExcerpt,
    }))

  const heroWidth = typeof window !== 'undefined' && window.innerWidth >= 768 ? '680px' : '320px'

  return (
    <>
      <RichResult />
      {site?.mainImage && (
        <Hero
          width="100%"
          height={heroWidth}
          src={imageUrlFor(site.mainImage).width(1800).url()}
          alt={site.mainImage?.alt?.nb}
        />
      )}
      <Container>
        <h1 style={{ visibility: 'hidden' }}>{site?.title}</h1>
        <h2>Kurs og aktiviteter</h2>
        {tourNodesInNorwegian && tourNodesInNorwegian.length > 0 && (
          <ProjectPreviewGrid
            nodes={tourNodesInNorwegian}
            browseMoreHref={browseMoreHref}
            locale="nb"
          />
        )}
      </Container>
    </>
  )
}
