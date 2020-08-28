require('dotenv').config();
const path = require('path');

const {
  api: { projectId, dataset },
} = requireConfig('../studio/sanity.json');

module.exports = {
  siteMetadata: {
    title: 'Kystleik',
    description:
      'Med havet som næraste nabo har vi verdas største og beste leikeplass',
    author: '@kystleik',
    siteUrl: 'https://www.kystleik.no/',
  },
  plugins: [
    'gatsby-plugin-postcss',
    {
      resolve: 'gatsby-plugin-styled-components',
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-sanity',
      options: {
        projectId,
        dataset,
        // To enable preview of drafts, copy .env-example into .env,
        // and add a token with read permissions
        token: process.env.SANITY_TOKEN,
        watchMode: true,
        overlayDrafts: true,
      },
    },
    { resolve: 'gatsby-plugin-sitemap' },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Kystleik',
        start_url: '/',
        background_color: '#0099cc',
        theme_color: '#0099cc',
        display: 'standalone',
        icon: 'src/images/favicon.png', // This path is relative to the root of the site.
      },
    },
    {
      resolve: 'gatsby-plugin-root-import',
      options: {
        containers: path.join(__dirname, 'src/containers'),
        components: path.join(__dirname, 'src/components'),
        images: path.join(__dirname, 'src/images'),
        services: path.join(__dirname, 'src/services'),
      },
    },
  ],
};

/**
 * We're requiring a file in the studio folder to make the monorepo
 * work "out-of-the-box". Sometimes you would to run this web frontend
 * in isolation (e.g. on codesandbox). This will give you an error message
 * with directions to enter the info manually or in the environment.
 */

function requireConfig(path) {
  try {
    return require('../studio/sanity.json');
  } catch (e) {
    console.error(
      'Failed to require sanity.json. Fill in projectId and dataset name manually in gatsby-config.js',
    );
    return {
      api: {
        projectId: process.env.SANITY_PROJECT_ID || '',
        dataset: process.env.SANITY_DATASET || '',
      },
    };
  }
}
