/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../containers/layout';
import SEO from '../components/SEO';
import GraphQLErrorList from '../components/graphql-error-list';
import BlockContent from '../components/block-content';
import Container from '../components/container';
import Hero from '../components/Hero';
import { imageUrlFor } from '../lib/image-url';

export const query = graphql`
  query TourTemplateQuery($id: String!) {
    tour: sanityTour(id: { eq: $id }) {
      id
      mainImage {
        crop {
          _key
          _type
          top
          bottom
          left
          right
        }
        hotspot {
          _key
          _type
          x
          y
          height
          width
        }
        asset {
          _id
        }
        alt {
          en
          nb
        }
      }
      title {
        nb
        en
      }
      description {
        nb
        en
      }
      _rawBody
      slug {
        en {
          current
        }
        nb {
          current
        }
      }
    }
  }
`;

const TourTemplate = props => {
  const {
    data,
    errors,
    pageContext: { locale },
  } = props;
  const tour = data && data.tour;
  const _rawBody = tour._rawBody[locale];
  return (
    <Layout locale={locale}>
      {errors && <SEO title="GraphQL Error" />}
      {tour && (
        <SEO
          title={tour.title[locale]}
          description={tour?.description?.[locale]}
          lang={locale === 'nb' ? 'no' : 'en'}
          image={tour.mainImage}
        />
      )}

      {errors && (
        <Container>
          <GraphQLErrorList errors={errors} />
        </Container>
      )}
      {tour.mainImage && (
        <div style={{ position: 'relative' }}>
          <svg
            style={{ position: 'absolute', top: '-2px', left: '0' }}
            width="100%"
            viewBox="0 0 4323 250"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="hidden"
          >
            <path
              d="M4323 100.909C4091.5 149.475 3848.5 63.0061 3412 47.3859C2750.36 23.7092 2638.5 209.134 2124.5 245.953C1683.02 277.578 1127.5 114.203 721 90.6202C314.504 67.0372 0 121.582 0 121.582V5.78165e-06H4323C4323 5.78165e-06 4323 222.431 4323 100.909Z"
              fill="white"
            />
          </svg>
          <Hero
            src={imageUrlFor(tour.mainImage)}
            alt={tour.mainImage?.alt?.[locale]}
          />
          <svg
            style={{
              position: 'absolute',
              bottom: '0',
              left: '0',
              width: '100%',
              height: 'auto',
            }}
            xmlns="http://www.w3.org/2000/svg"
            width="4323"
            height="302"
            fill="none"
            viewBox="0 0 4323 302"
          >
            <path
              fill="#fff"
              d="M-46 52c40.5 34.5 306.5-30.521 1013 59C2052 235.336 1871.01-22.204 2460.01 2.1c444.73 18.35 723.5 105.934 1130 148.208s733.5 12.931 733.5 12.931V301.5H.513S-46 215-46 52z"
            />
          </svg>
        </div>
      )}
      <Container>
        <h1>{tour.title[locale]}</h1>
        {_rawBody && <BlockContent blocks={_rawBody} />}
      </Container>
    </Layout>
  );
};

export default TourTemplate;
