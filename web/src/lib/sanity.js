import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// Sanity configuration
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

// GROQ Query Fragments (reusable)
const IMAGE_FRAGMENT = `
  asset->{_id},
  crop,
  hotspot,
  alt
`

const SLUG_FRAGMENT = `
  nb { current },
  en { current }
`

// Generic query wrapper with error handling
async function fetchWithFallback(query, params = {}, fallback = null) {
  try {
    return await client.fetch(query, params)
  } catch (error) {
    console.warn(`Failed to fetch data: ${error.message}`)
    return fallback
  }
}

// Data fetching functions using GROQ
export async function getSiteSettings() {
  const query = `*[_type == "siteSettings"][0]{
    title,
    mainImage {
      ${IMAGE_FRAGMENT}
    },
    description,
    keywords
  }`
  
  return fetchWithFallback(query, {}, {
    title: 'Kystleik',
    description: 'Med havet som næraste nabo har vi verdas største og beste leikeplass',
    keywords: []
  })
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
  
  return fetchWithFallback(query, {}, {
    name: 'Kystleik',
    address1: 'Vodlavegen 2',
    zipCode: '5381',
    city: 'Glesvær',
    country: 'Norge'
  })
}

export async function getAllPages() {
  const query = `*[_type == "page"]{
    _id,
    title,
    slug {
      ${SLUG_FRAGMENT}
    }
  }`
  
  return fetchWithFallback(query, {}, [])
}

export async function getPageBySlug(slug, locale = 'nb') {
  const query = `*[_type == "page" && slug.${locale}.current == $slug][0]{
    _id,
    title,
    description,
    mainImage {
      ${IMAGE_FRAGMENT}
    },
    body
  }`
  
  return fetchWithFallback(query, { slug }, null)
}

export async function getAllTours() {
  const query = `*[_type == "tour"]{
    _id,
    mainImage {
      ${IMAGE_FRAGMENT}
    },
    title,
    slug {
      ${SLUG_FRAGMENT}
    }
  }`
  
  return fetchWithFallback(query, {}, [])
}

export async function getTourBySlug(slug, locale = 'nb') {
  const query = `*[_type == "tour" && slug.${locale}.current == $slug][0]{
    _id,
    mainImage {
      ${IMAGE_FRAGMENT}
    },
    title,
    description,
    body,
    slug {
      ${SLUG_FRAGMENT}
    }
  }`
  
  return fetchWithFallback(query, { slug }, null)
}
