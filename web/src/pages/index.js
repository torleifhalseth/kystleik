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
import { imageUrlFor } from '../lib/image-url';

export const query = graphql`
  query IndexPageQuery {
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
  const isWindowDefined = typeof window !== 'undefined';

  return (
    <Layout locale="nb">
      <SEO
        title={site.title}
        description={site.description}
        keywords={site.keywords}
        lang="no"
      />
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
        {site.mainImage && (
          <Hero
            width="100%"
            height={
              isWindowDefined && window.innerWidth >= 768 ? '680px' : '320px'
            }
            src={imageUrlFor(site.mainImage).width(
              (isWindowDefined && window?.innerWidth) || 1800,
            )}
            alt={site.mainImage?.alt?.nb}
          />
        )}
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
      <Container>
        <h1 style={{ visibility: 'hidden' }}>{site.title}</h1>
        <h2>Kurs og turar</h2>
        {tourNodes && (
          <ProjectPreviewGrid
            nodes={tourNodesInNorwegian}
            browseMoreHref={browseMoreHref}
            locale="nb"
          />
        )}
      </Container>
    </Layout>
  );
};

export default IndexPage;
