import { motion } from 'framer-motion'
import { Link } from 'gatsby'
import React from 'react'

import DevIcon from '../DevIcon'
import Icon from '../Icon'
import SearchEmptyState from '../SearchEmptyState'
import './styles.css'

const CodeSnippetsList = ({ snippets, fullList = false }) => {
  const buttonAnimationLeft = {
    rest: {
      x: 0,
      y: 0,
      transition: { duration: 2, type: 'spring' },
    },
    hover: {
      x: 40,
      y: 20,
      transition: { duration: 2, type: 'spring' },
    },
  }

  const buttonAnimation = {
    rest: {
      x: 0,
      y: 0,
      transition: { duration: 2, type: 'spring' },
    },
    hover: {
      x: -20,
      y: -10,
      transition: { duration: 2, type: 'spring' },
    },
  }

  if (snippets.length === 0) {
    return <SearchEmptyState />
  }

  return (
    <div className={`snippets-list${fullList ? ' snippets-list--full' : ''}`}>
      <div className="snippets-list__posts">
        {snippets.map(snippet => (
          <Link key={snippet.slug} to={snippet.slug} className="snippets-list__post">
            <article>
              <h1 className="snippets-list__post__title">{snippet.title}</h1>
              <div className="snippets-list__post__icons">{snippet.tags && snippet.tags.map(tag => <DevIcon key={tag} name={tag} />)}</div>
              <div className="snippets-list__post__arrow">
                <Icon name="ArrowRight" size="xsmall" />
              </div>
            </article>
          </Link>
        ))}

        {!fullList && (
          <Link className="snippets-list__view-all--wrapper" to={'/snippets'}>
            <motion.div className="snippets-list__view-all" initial="rest" animate="rest" whileHover="hover">
              <motion.span variants={buttonAnimationLeft} />
              <motion.span variants={buttonAnimation} />
              View all my snippets
            </motion.div>
          </Link>
        )}
      </div>
    </div>
  )
}

export default CodeSnippetsList
