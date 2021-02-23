/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import { graphql } from 'gatsby';
import Container from '../../components/container';
import GraphQLErrorList from '../../components/graphql-error-list';
import ProjectPreviewGrid from '../../components/project-preview-grid';
import SEO from '../../components/SEO';
import Layout from '../../containers/layout';
import { mapEdgesToNodes, filterOutDocsWithoutSlugs } from '../../lib/helpers';

import { responsiveTitle1 } from '../../components/typography.module.css';

export const query = graphql`
  query NbNOToursPageQuery {
    tours: allSanityTour {
      edges {
        node {
          id
          mainImage {
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

const ToursPage = props => {
  const { data, errors } = props;
  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }
  const tourNodes =
    data &&
    data.tours &&
    mapEdgesToNodes(data.tours).filter(filterOutDocsWithoutSlugs);
  const browseMoreHref = '/no/kurs-og-turer/';
  const tourNodesInNorwegian = tourNodes.map(tour => ({
    slug: `${browseMoreHref}${tour.slug.nb.current}`,
    mainImage: tour.mainImage,
    title: tour.title.nb,
    _rawExcerpt: tour._rawExcerpt,
  }));
  return (
    <Layout locale="nb">
      <SEO title="Kurs og turer" lang="no" />
      <Container>
        <h1 className={responsiveTitle1}>Kurs og turer</h1>
        {tourNodesInNorwegian && tourNodesInNorwegian.length > 0 && (
          <ProjectPreviewGrid nodes={tourNodesInNorwegian} />
        )}
      </Container>
    </Layout>
  );
};

export default ToursPage;
