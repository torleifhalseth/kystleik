import { useStaticQuery, graphql } from 'gatsby'

export const usePageData = () => {
  const { allSanityPage } = useStaticQuery(
    graphql`
      query loadPagesQueryForHook {
        allSanityPage {
          edges {
            node {
              id
              title {
                en
                nb
              }
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
    `
  )
  return allSanityPage.edges
}
