import { graphql } from 'gatsby'
import React from 'react'

import Canvas from '../components/Canvas'
import Layout from '../components/layout'
import Seo from '../components/seo'

const AboutPage = ({ data, location }) => {
  return (
    <Layout location={location}>
      <Seo title="Guestbook" />
      <Canvas />
    </Layout>
  )
}

export default AboutPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
