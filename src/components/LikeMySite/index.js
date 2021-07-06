import React, { useEffect, useState } from 'react'

import Button from '../Button'
import './style.css'

const LikeMySite = ({ repo, repoAPI }) => {
  const [stars, setStars] = useState('-')

  useEffect(() => {
    fetch(repoAPI)
      .then(res => res.json())
      .then(data => {
        if (data.stargazers_count) setStars(data.stargazers_count)
      })
  }, [])

  return (
    <div className="git-like">
      <h5 className="git-like__title">Like my site?</h5>
      <div className="git-like__button">
        <Button icon="Star" small to={repo} newTab>
          {stars}
        </Button>
      </div>
      <p className="git-like__desc">
        You can find all the code on my{' '}
        <a href={repo} target="_blank" rel="noopener noreferrer">
          Github repo
        </a>
        . I would love if you gave it a star.
      </p>
    </div>
  )
}

export default LikeMySite
