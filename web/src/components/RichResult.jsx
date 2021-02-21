import React from 'react';
import Helmet from 'react-helmet';

export default () => (
  <Helmet>
    <script type="application/ld+json">
      {`{
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
              "streetAddress": "Holmen 11",
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
          }`}
    </script>
  </Helmet>
);
