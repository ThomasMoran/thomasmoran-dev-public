import balanceText from 'balance-text'
import { Link } from 'gatsby'
import React, { useEffect } from 'react'

import Bio from '../Bio'
import Tags from '../Tags'
import './style.css'

const Post = ({ post, previous, next }) => {
  useEffect(() => {
    balanceText('.post__header__title', { watch: true })
  }, [])

  return (
    <>
      <article className="post" itemScope itemType="http://schema.org/Article">
        <header>
          <p className="post__header__date">
            <time dateTime={new Date(post.frontmatter.date).toLocaleDateString()} itemProp="datePublished">
              {post.frontmatter.date}
            </time>
          </p>
          <h1 className="post__header__title" itemProp="headline">
            {post.frontmatter.title}
          </h1>
          {post.frontmatter.intro && (
            <p className="post__header__intro" itemProp="description">
              {post.frontmatter.intro}
            </p>
          )}
          <Tags tags={post.frontmatter.tags} />
        </header>
        <section className="post__content" dangerouslySetInnerHTML={{ __html: post.html }} itemProp="articleBody" />
        <footer>
          <Bio />
        </footer>
      </article>
      <nav className="post-nav">
        <ul>
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="previous">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </>
  )
}

export default Post
