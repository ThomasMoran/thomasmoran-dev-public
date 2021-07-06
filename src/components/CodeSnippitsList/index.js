import { motion } from 'framer-motion'
import { Link } from 'gatsby'
import React from 'react'

import DevIcon from '../DevIcon'
import Icon from '../Icon'
import SearchEmptyState from '../SearchEmptyState'
import './styles.css'

const CodeSnippitsList = ({ snippits, fullList = false }) => {
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

  if (snippits.length === 0) {
    return <SearchEmptyState />
  }

  return (
    <div className={`snippits-list${fullList ? ' snippits-list--full' : ''}`}>
      <div className="snippits-list__posts">
        {snippits.map(snippit => (
          <Link key={snippit.slug} to={snippit.slug} className="snippits-list__post">
            <article>
              <h1 className="snippits-list__post__title">{snippit.title}</h1>
              <div className="snippits-list__post__icons">{snippit.tags && snippit.tags.map(tag => <DevIcon key={tag} name={tag} />)}</div>
              <div className="snippits-list__post__arrow">
                <Icon name="ArrowRight" size="xsmall" />
              </div>
            </article>
          </Link>
        ))}

        {!fullList && (
          <Link className="snippits-list__view-all--wrapper" to={'/snippits'}>
            <motion.div className="snippits-list__view-all" initial="rest" animate="rest" whileHover="hover">
              <motion.span variants={buttonAnimationLeft} />
              <motion.span variants={buttonAnimation} />
              View all my snippits
            </motion.div>
          </Link>
        )}
      </div>
    </div>
  )
}

export default CodeSnippitsList
