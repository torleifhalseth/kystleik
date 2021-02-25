/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import { graphql } from 'gatsby';
import { mapEdgesToNodes, filterOutDocsWithoutSlugs } from '../../lib/helpers';
import Container from '../../components/container';
import GraphQLErrorList from '../../components/graphql-error-list';
import ProjectPreviewGrid from '../../components/project-preview-grid';
import SEO from '../../components/SEO';
import Hero from '../../components/Hero';
import Layout from '../../containers/layout';
import { imageUrlFor } from '../../lib/image-url';
import RichResult from '../../components/RichResult';

export const query = graphql`
  query IndexPageQueryEn {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
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
  const browseMoreHref = '/en/courses-and-tours/';
  const tourNodesInEnglish = tourNodes.map(tour => ({
    slug: `${browseMoreHref}${tour.slug.en.current}`,
    mainImage: tour.mainImage,
    title: tour.title.en,
    _rawExcerpt: tour._rawExcerpt,
  }));

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.',
    );
  }

  const isWindowDefined = typeof window !== 'undefined';

  return (
    <Layout locale="en">
      <SEO
        title={site.title}
        description="With the ocean as our neighbor we have the worlds largest and best playground"
        keywords={site.keywords}
        lang="en"
      />
      <RichResult />
      {site.mainImage && (
        <Hero
          width="100%"
          height={
            isWindowDefined && window.innerWidth >= 768 ? '680px' : '320px'
          }
          src={imageUrlFor(site.mainImage).width(
            (isWindowDefined && window?.innerWidth) || 1800,
          )}
          alt={site.mainImage?.alt?.en}
        />
      )}
      <Container>
        <h1 style={{ visibility: 'hidden' }}>{site.title}</h1>
        <h2>Courses and tours</h2>
        {tourNodesInEnglish && (
          <ProjectPreviewGrid
            nodes={tourNodesInEnglish}
            browseMoreHref={browseMoreHref}
            locale="en"
          />
        )}
      </Container>
    </Layout>
  );
};

export default IndexPage;
