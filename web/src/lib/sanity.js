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
  try {
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
  } catch (error) {
    console.warn('Failed to fetch site settings:', error.message)
    return {
      title: 'Kystleik',
      description: 'Med havet som næraste nabo har vi verdas største og beste leikeplass',
      keywords: []
    }
  }
}

export async function getCompanyInfo() {
  try {
    const query = `*[_type == "companyInfo"][0]{
      name,
      address1,
      address2,
      zipCode,
      city,
      country
    }`
    return await client.fetch(query)
  } catch (error) {
    console.warn('Failed to fetch company info:', error.message)
    return {
      name: 'Kystleik',
      address1: 'Vodlavegen 2',
      zipCode: '5381',
      city: 'Glesvær',
      country: 'Norge'
    }
  }
}

export async function getAllPages() {
  try {
    const query = `*[_type == "page"]{
      _id,
      title,
      slug
    }`
    return await client.fetch(query)
  } catch (error) {
    console.warn('Failed to fetch pages:', error.message)
    return []
  }
}

export async function getPageBySlug(slug, locale = 'nb') {
  try {
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
  } catch (error) {
    console.warn('Failed to fetch page:', error.message)
    return null
  }
}

export async function getAllTours() {
  try {
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
  } catch (error) {
    console.warn('Failed to fetch tours:', error.message)
    return []
  }
}

export async function getTourBySlug(slug, locale = 'nb') {
  try {
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
  } catch (error) {
    console.warn('Failed to fetch tour:', error.message)
    return null
  }
}
