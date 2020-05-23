const supportedLanguages = [
  { id: 'nb', title: 'Norwegian', isDefault: true },
  { id: 'en', title: 'English' }
]

export default {
  name: 'localeSlug',
  type: 'object',
  fieldsets: [
    {
      title: 'Translations',
      name: 'translations',
      options: { collapsible: true }
    }
  ],
  fields: supportedLanguages.map(lang => ({
    title: lang.title,
    name: lang.id,
    type: 'slug',
    fieldset: lang.isDefault ? null : 'translations'
  }))
}
