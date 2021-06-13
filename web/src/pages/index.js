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
import RichResult from '../components/RichResult';
import Alert from '../components/Alert';

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

const IndexPage = (props) => {
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

  const browseMoreHref = '/no/kurs-og-aktiviteter/';
  const tourNodesInNorwegian = tourNodes.map((tour) => ({
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
      <RichResult />
      <Container>
        <Alert>
          <h2>Sommeraktiviteter for barn</h2>
          <ul>
            <li>
              <a
                href="https://forms.gle/j8R4T1NUYaEG39Fv5"
                target="_blank"
                rel="noreferrer"
              >
                Påmelding til sommercamp i juni og juli
              </a>
            </li>
            <li>
              <a
                href="https://forms.gle/kcPXziNxUzpU7Hq37"
                target="_blank"
                rel="noreferrer"
              >
                Påmelding til dagaktiviteter i juni
              </a>
            </li>
            <li>
              <a
                href="https://forms.gle/FZZVh3kv4rUM58417"
                target="_blank"
                rel="noreferrer"
              >
                Påmelding til dagaktiviteter i august
              </a>
            </li>
          </ul>
        </Alert>
      </Container>
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
      <Container>
        <h1 style={{ visibility: 'hidden' }}>{site.title}</h1>
        <h2>Kurs og aktiviteter</h2>
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
