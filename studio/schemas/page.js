export const fields = [
  {
    name: 'title',
    title: 'Title',
    type: 'localeString'
  },
  {
    name: 'description',
    title: 'Beskrivelse',
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
];

export default {
  name: 'page',
  title: 'Page',
  type: 'document',
  liveEdit: false,
  preview: {
    select: {
      title: 'title.nb',
      subtitle: 'releaseDate'
    }
  },
  // You probably want to uncomment the next line once you've made the pages documents in the Studio. This will remove the pages document type from the create-menus.
  // __experimental_actions: ['update', 'publish'],
  fields
};
