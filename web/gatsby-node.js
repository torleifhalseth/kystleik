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
                current
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
      const slug = edge.node.slug.current
      createPage({
        // Path for this page — required
        path: `/no/turer/${slug}/`,
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
          id: edge.node.id
        }
      })
    })
  })
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  await createTourPages(graphql, actions, reporter)
}
