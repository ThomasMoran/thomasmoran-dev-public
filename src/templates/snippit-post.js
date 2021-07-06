import { graphql } from 'gatsby'
import React from 'react'

import Post from '../components/Post'
import Layout from '../components/layout'
import Seo from '../components/seo'

const SnippitPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  const { previous, next } = data

  return (
    <Layout location={location}>
      <Seo title={post.frontmatter.title} description={post.frontmatter.description || post.excerpt} />
      <Post post={post} previous={previous} next={next} />
    </Layout>
  )
}

export default SnippitPostTemplate

export const pageQuery = graphql`
  query SnippitPostBySlug($id: String!, $previousPostId: String, $nextPostId: String) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }, fileAbsolutePath: { regex: "/snippit/" }) {
      id
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        intro
        description
        tags
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }, fileAbsolutePath: { regex: "/snippit/" }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }, fileAbsolutePath: { regex: "/snippit/" }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
