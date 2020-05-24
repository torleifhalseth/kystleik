/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

async function createTourPages (graphql, actions, reporter) {
  const { createPage } = actions
  const template = require.resolve('./src/templates/tour.js')
  return graphql(
    `
      query loadPagesQuery($limit: Int!) {
        allSanityTour(limit: $limit) {
          edges {
            node {
              id
              slug {
                nb {
                  current
                }
                en {
                  current
                }
              }
            }
          }
        }
      }
    `,
    { limit: 1000 }
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create tour pages.
    result.data.allSanityTour.edges.forEach(edge => {
      createPage({
        // Path for this page — required
        path: `/no/turer/${edge.node.slug.nb.current}`,
        component: template,
        context: {
          // Add optional context data to be inserted
          // as props into the page component..
          //
          // The context data can also be used as
          // arguments to the page GraphQL query.
          //
          // The page "path" is always available as a GraphQL
          // argument.
          id: edge.node.id,
          locale: 'nb'
        }
      })
      createPage({
        // Path for this page — required
        path: `/en/tours/${edge.node.slug.en.current}`,
        component: template,
        context: {
          id: edge.node.id,
          locale: 'en'
        }
      })
    })
  })
}

async function createPages (graphql, actions, reporter) {
  const { createPage } = actions
  const template = require.resolve('./src/templates/page.js')
  return graphql(
    `
      query loadPagesQuery($limit: Int!) {
        allSanityPage(limit: $limit) {
          edges {
            node {
              id
              slug {
                nb {
                  current
                }
                en {
                  current
                }
              }
            }
          }
        }
      }
    `,
    { limit: 1000 }
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create tour pages.
    result.data.allSanityPage.edges.forEach(edge => {
      createPage({
        // Path for this page — required
        path: `/no/${edge.node.slug.nb.current}`,
        component: template,
        context: {
          id: edge.node.id,
          locale: 'nb'
        }
      })
      createPage({
        // Path for this page — required
        path: `/en/${edge.node.slug.en.current}`,
        component: template,
        context: {
          id: edge.node.id,
          locale: 'en'
        }
      })
    })
  })
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  await createPages(graphql, actions, reporter)
  await createTourPages(graphql, actions, reporter)
}
