import Script from 'next/script'

export default function RichResult() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://kystleik.no",
    "name": "Kystleik",
    "image": [
      "https://kystleik.no/cover-1x1.jpg",
      "https://kystleik.no/cover-4x3.jpg",
      "https://kystleik.no/cover-16x9.jpg"
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Vodlavegen 2",
      "addressLocality": "Glesvær",
      "addressRegion": "Vestland",
      "postalCode": "5381",
      "addressCountry": "NO"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 60.2036302,
      "longitude": 5.0394198
    },
    "url": "https://kystleik.no",
    "telephone": "+4793293325"
  }

  return (
    <Script
      id="rich-result-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
