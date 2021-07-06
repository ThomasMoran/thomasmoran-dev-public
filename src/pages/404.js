import { graphql } from 'gatsby'
import React from 'react'

import Layout from '../components/layout'
import Seo from '../components/seo'

const NotFoundPage = ({ data, location }) => {
  return (
    <Layout location={location}>
      <Seo title="404: Not Found" />
      <h1>404: Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Layout>
  )
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
