/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import { graphql } from 'gatsby';
import Container from '../components/container';
import BlockContent from '../components/block-content';
import { responsiveTitle1 } from '../components/typography.module.css';
import GraphQLErrorList from '../components/graphql-error-list';
import SEO from '../components/SEO';
import Layout from '../containers/layout';

export const query = graphql`
  query PageTemplateQuery($id: String!) {
    page: sanityPage(id: { eq: $id }) {
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
      slug {
        en {
          current
        }
        nb {
          current
        }
      }
      _rawBody
    }
  }
`;

const PageTemplate = props => {
  const {
    data,
    errors,
    pageContext: { locale },
  } = props;
  const page = data && data.page;
  return (
    <Layout locale={locale}>
      {errors && <SEO title="GraphQL Error" />}
      {page && (
        <SEO
          title={page.title[locale] || 'Untitled'}
          description={page.description[locale]}
          lang={locale === 'nb' ? 'no' : 'en'}
          image={page.mainImage}
        />
      )}

      {errors && (
        <Container>
          <GraphQLErrorList errors={errors} />
        </Container>
      )}
      <Container>
        <h1 className={responsiveTitle1}>{page.title[locale]}</h1>
        <BlockContent blocks={page._rawBody[locale] || []} />
      </Container>
    </Layout>
  );
};

export default PageTemplate;
