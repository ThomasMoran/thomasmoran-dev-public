const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Define a templates for posts
  const blogPostTemplate = path.resolve(`./src/templates/blog-post.js`)
  const snippetPostTemplate = path.resolve(`./src/templates/snippet-post.js`)

  // Get all markdown blog posts sorted by date
  const result = await graphql(
    `
      {
        allMarkdownRemark(sort: { fields: [frontmatter___date], order: ASC }, limit: 1000) {
          nodes {
            id
            fields {
              slug
            }
            frontmatter {
              type
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(`There was an error loading your blog posts`, result.errors)
    return
  }

  const snippets = result.data.allMarkdownRemark.nodes.filter(post => post.frontmatter.type === 'snippet')
  const blogs = result.data.allMarkdownRemark.nodes.filter(post => post.frontmatter.type === 'blog')

  // Create blog posts pages
  // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (snippets.length > 0) {
    snippets.forEach((snippet, index) => {
      const previousPostId = index === 0 ? null : snippets[index - 1].id
      const nextPostId = index === snippets.length - 1 ? null : snippets[index + 1].id

      createPage({
        path: snippet.fields.slug,
        component: snippetPostTemplate,
        context: {
          id: snippet.id,
          previousPostId,
          nextPostId,
        },
      })
    })
  }

  if (blogs.length > 0) {
    blogs.forEach((blog, index) => {
      const previousPostId = index === 0 ? null : blogs[index - 1].id
      const nextPostId = index === blogs.length - 1 ? null : blogs[index + 1].id

      createPage({
        path: blog.fields.slug,
        component: blogPostTemplate,
        context: {
          id: blog.id,
          previousPostId,
          nextPostId,
        },
      })
    })
  }
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })

    if (node.frontmatter.type === 'snippet') {
      createNodeField({
        name: `slug`,
        node,
        value: `/snippets${value}`,
      })
    } else {
      createNodeField({
        name: `slug`,
        node,
        value: `/blog${value}`,
      })
    }
  }
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
      linkedin: String
      github: String
      repo: String
      repoAPI: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
      tableOfContents: String
    }

    type Frontmatter {
      date: Date @dateformat
      lastModified: Date @dateformat
      title: String
      intro: String
      description: String
      tags: [String]
      type: String
    }

    type Fields {
      slug: String
    }
  `)
}
