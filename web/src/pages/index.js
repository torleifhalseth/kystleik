/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import { graphql } from 'gatsby';
import { mapEdgesToNodes, filterOutDocsWithoutSlugs } from '../lib/helpers';
import Container from '../components/container';
import GraphQLErrorList from '../components/graphql-error-list';
import ProjectPreviewGrid from '../components/project-preview-grid';
import SEO from '../components/SEO';
import Hero from '../components/Hero';
import Layout from '../containers/layout';

export const query = graphql`
  query IndexPageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
      keywords
    }

    tours: allSanityTour {
      edges {
        node {
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
            en
            nb
          }
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
    }
  }
`;

const IndexPage = props => {
  const { data, errors } = props;

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  const site = (data || {}).site;
  const tourNodes = (data || {}).tours
    ? mapEdgesToNodes(data.tours).filter(filterOutDocsWithoutSlugs)
    : [];

  const browseMoreHref = '/no/kurs-og-turar/';
  const tourNodesInNorwegian = tourNodes.map(tour => ({
    slug: `${browseMoreHref}${tour.slug.nb.current}`,
    mainImage: tour.mainImage,
    title: tour.title.nb,
    _rawExcerpt: tour._rawExcerpt,
  }));

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.',
    );
  }

  return (
    <Layout locale="nb">
      <SEO
        title={site.title}
        description={site.description}
        keywords={site.keywords}
        lang="no"
      />
      <Hero imgSrc="/hero-climb.jpeg" />
      <Container>
        <h1>Kurs og turar</h1>
        {tourNodes && (
          <ProjectPreviewGrid
            nodes={tourNodesInNorwegian}
            browseMoreHref={browseMoreHref}
          />
        )}
      </Container>
    </Layout>
  );
};

export default IndexPage;
