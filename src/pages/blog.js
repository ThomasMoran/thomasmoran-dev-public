import { graphql } from 'gatsby'
import React, { useState } from 'react'

import Bio from '../components/Bio'
import BlogList from '../components/BlogList'
import SearchBar from '../components/SearchBar'
import Title from '../components/Title'
import Layout from '../components/layout'
import Seo from '../components/seo'

const BlogIndex = ({ data, location }) => {
  // Reformat data so that we can easily use search results.
  // This saves the need to filter data by search result ids.
  // Would need changing if the blog list contained more information.
  const posts = data.blog.nodes.map(node => {
    return {
      id: node.id,
      title: node.frontmatter.title,
      date: node.frontmatter.date,
      tags: node.frontmatter.tags,
      slug: node.fields.slug,
    }
  })
  const [displayedPosts, setDisplayedPosts] = useState(posts)

  const handleDisplayedPosts = (query, searchResults) => {
    if (query === '') {
      setDisplayedPosts(posts)
    } else {
      setDisplayedPosts(searchResults)
    }
  }

  return (
    <Layout location={location}>
      <Seo title="All Blog Posts" />
      <Title title="Blog">
        <p>
          Browse through my posts or simply search by title or keyword{' '}
          <span role="img" aria-label="stars emoji">
            ✨
          </span>
          .
        </p>
      </Title>
      <SearchBar searchIndex={data.siteSearchIndex.index} setPosts={handleDisplayedPosts} />
      <BlogList posts={displayedPosts} />
      <Bio />
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query BlogListQuery {
    siteSearchIndex {
      index
    }
    site {
      siteMetadata {
        title
      }
    }
    blog: allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }, filter: { fileAbsolutePath: { regex: "/blog/" } }) {
      nodes {
        id
        excerpt(pruneLength: 200)
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
          tags
        }
      }
    }
  }
`
