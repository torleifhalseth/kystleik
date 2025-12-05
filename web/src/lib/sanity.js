import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// Import Sanity configuration
const sanityConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'qc3nk3mq',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
}

export const client = createClient({
  projectId: sanityConfig.projectId,
  dataset: sanityConfig.dataset,
  apiVersion: sanityConfig.apiVersion,
  useCdn: sanityConfig.useCdn,
  token: process.env.SANITY_TOKEN,
})

// Image URL builder
const builder = imageUrlBuilder(client)

export function imageUrlFor(source) {
  return builder.image(source)
}

// Data fetching functions
export async function getSiteSettings() {
  const query = `*[_type == "siteSettings"][0]{
    title,
    mainImage {
      asset->{_id},
      crop,
      hotspot,
      alt
    },
    description,
    keywords
  }`
  return await client.fetch(query)
}

export async function getCompanyInfo() {
  const query = `*[_type == "companyInfo"][0]{
    name,
    address1,
    address2,
    zipCode,
    city,
    country
  }`
  return await client.fetch(query)
}

export async function getAllPages() {
  const query = `*[_type == "page"]{
    _id,
    title,
    slug
  }`
  return await client.fetch(query)
}

export async function getPageBySlug(slug, locale = 'nb') {
  const query = `*[_type == "page" && slug.${locale}.current == $slug][0]{
    _id,
    title,
    description,
    mainImage {
      asset->{_id},
      crop,
      hotspot,
      alt
    },
    body
  }`
  return await client.fetch(query, { slug })
}

export async function getAllTours() {
  const query = `*[_type == "tour"]{
    _id,
    mainImage {
      asset->{_id},
      crop,
      hotspot,
      alt
    },
    title,
    slug
  }`
  return await client.fetch(query)
}

export async function getTourBySlug(slug, locale = 'nb') {
  const query = `*[_type == "tour" && slug.${locale}.current == $slug][0]{
    _id,
    mainImage {
      asset->{_id},
      crop,
      hotspot,
      alt
    },
    title,
    description,
    body,
    slug
  }`
  return await client.fetch(query, { slug })
}
