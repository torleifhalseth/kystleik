export default {
  name: 'metadata',
  title: 'Metadata',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Tittel',
      type: 'string',
      description:
        'Choose a title that reads naturally and effectively communicates the topic of the page’s content.'
    },
    {
      name: 'description',
      title: 'Beskrivelse',
      type: 'string'
    },
    {
      name: 'image',
      title: 'Bilde',
      type: 'mainImage'
    }
  ]
};
