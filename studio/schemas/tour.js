import { fields } from './page'

export default {
  name: 'tour',
  title: 'Tour',
  type: 'document',
  preview: {
    select: {
      title: 'title.nb',
      subtitle: 'releaseDate'
    }
  },
  fields
}
