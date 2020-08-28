/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import SEO from '../components/SEO';
import Container from '../components/layout';
import Layout from '../containers/layout';

import { responsiveTitle1 } from '../components/typography.module.css';

const NotFoundPage = () => (
  <Layout locale="nb">
    <SEO title="404: Not found" />
    <Container>
      <h1 className={responsiveTitle1}>Not found</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Container>
  </Layout>
);

export default NotFoundPage;
