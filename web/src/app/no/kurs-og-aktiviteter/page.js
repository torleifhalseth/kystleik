import Container from '@/components/container'
import ProjectPreviewGrid from '@/components/project-preview-grid'
import { getAllTours } from '@/lib/sanity'
import { responsiveTitle1 } from '@/components/typography.module.css'

export const metadata = {
  title: 'Kurs og aktiviteter - Kystleik',
  description: 'Se våre kurs og aktiviteter',
}

export default async function ToursPage() {
  const tours = await getAllTours()
  const browseMoreHref = '/no/kurs-og-aktiviteter/'
  
  const tourNodesInNorwegian = tours
    .filter(tour => tour.slug?.nb?.current)
    .map(tour => ({
      slug: `${browseMoreHref}${tour.slug.nb.current}/`,
      mainImage: tour.mainImage,
      title: tour.title?.nb || '',
      _rawExcerpt: tour._rawExcerpt,
    }))
  
  return (
    <Container>
      <h1 className={responsiveTitle1}>Kurs og aktiviteter</h1>
      {tourNodesInNorwegian && tourNodesInNorwegian.length > 0 && (
        <ProjectPreviewGrid nodes={tourNodesInNorwegian} />
      )}
    </Container>
  )
}
