/* eslint-disable react/jsx-pascal-case */
import React from 'react'
import { graphql } from 'gatsby'
import BlockContent from '../../components/block-content'
import Container from '../../components/container'
import GraphQLErrorList from '../../components/graphql-error-list'
import SEO from '../../components/seo'
import Layout from '../../containers/layout'

import { responsiveTitle1 } from '../../components/typography.module.css'

export const query = graphql`
  query ContactPageQuery {
    page: sanityPage(_id: { regex: "/(drafts.|)6ed157ec-92e8-4164-aabe-3c625db35c6c/" }) {
      title {
        en
      }
      _rawBody
    }
  }
`

const ContactPage = props => {
  const { data, errors } = props

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
  }

  const page = data.page

  if (!page) {
    throw new Error(
      'Missing "Contact" page data. Open the studio at http://localhost:3333 and add "Contact" page data and restart the development server.'
    )
  }

  return (
    <Layout>
      <SEO title={page.title.en} />
      <Container>
        <h1 className={responsiveTitle1}>{page.title.en}</h1>
        <BlockContent blocks={page._rawBody.en || []} />
      </Container>
    </Layout>
  )
}

ContactPage.defaultProps = {
  data: {
    page: {
      title: 'No title'
    }
  }
}
export default ContactPage
