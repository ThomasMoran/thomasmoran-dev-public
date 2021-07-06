import { Link } from 'gatsby'
import React from 'react'

import Icon from '../Icon'
import SearchEmptyState from '../SearchEmptyState'
import './style.css'

const BlogList = ({ posts }) => {
  if (posts.length === 0) {
    return <SearchEmptyState />
  }
  return (
    <div className="blog-list">
      <div>
        {posts.slice(0, 4).map(post => (
          <Link key={post.slug} className="blog-list__post__link" to={post.slug} itemProp="url">
            <article className="blog-list__post">
              <time className="blog-list__post__date" dateTime={new Date(post.date).toLocaleDateString()}>
                {post.date}
              </time>
              <div className="blog-list__post__details">
                <h1 className="blog-list__post__title" itemProp="headline">
                  {post.title}
                </h1>
                <div className="blog-list__post__tags">
                  {post.tags &&
                    post.tags.map(tag => (
                      <small key={tag} className="blog-list__post__tag">
                        {tag}
                      </small>
                    ))}
                </div>
              </div>
              <div className="blog-list__post__read">
                <small>Read Me</small>
                <div className="blog-list__post__icon">
                  <Icon name="ArrowRight" size="small" />
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default BlogList
