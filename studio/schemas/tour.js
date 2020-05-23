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
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'localeString'
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'localeSlug',
      description:
        'Some frontend will require a slug to be set to be able to show the project',
      options: {
        source: 'title',
        maxLength: 96
      }
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'mainImage'
    },
    {
      name: 'body',
      title: 'Content',
      type: 'localeBlockContent'
    }
  ]
}
