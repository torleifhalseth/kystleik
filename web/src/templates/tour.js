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
  console.log(data);
  return (
    <Layout locale={locale}>
      {errors && <SEO title="GraphQL Error" />}
      {tour && (
        <SEO
          title={tour.title[locale] || 'Untitled'}
          lang={locale === 'nb' ? 'no' : 'en'}
        />
      )}

      {errors && (
        <Container>
          <GraphQLErrorList errors={errors} />
        </Container>
      )}
      {tour.mainImage && <Hero imgSrc={imageUrlFor(tour.mainImage)} />}
      <Container>
        <h1>{tour.title[locale]}</h1>
        {_rawBody && <BlockContent blocks={_rawBody} />}
      </Container>
    </Layout>
  );
};

export default TourTemplate;
