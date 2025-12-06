import Container from '@/components/container'
import ProjectPreviewGrid from '@/components/project-preview-grid'
import { getAllTours } from '@/lib/sanity'
import { responsiveTitle1 } from '@/components/typography.module.css'

export const metadata = {
  title: 'Courses and Tours - Kystleik',
  description: 'See our courses and tours',
}

export default async function ToursPage() {
  const tours = await getAllTours()
  const browseMoreHref = '/en/courses-and-tours/'
  
  const tourNodesInEnglish = tours
    .filter(tour => tour.slug?.en?.current)
    .map(tour => ({
      slug: `${browseMoreHref}${tour.slug.en.current}/`,
      mainImage: tour.mainImage,
      title: tour.title?.en || '',
      _rawExcerpt: tour._rawExcerpt,
    }))
  
  return (
    <Container>
      <h1 className={responsiveTitle1}>Courses and Tours</h1>
      {tourNodesInEnglish && tourNodesInEnglish.length > 0 && (
        <ProjectPreviewGrid nodes={tourNodesInEnglish} />
      )}
    </Container>
  )
}
