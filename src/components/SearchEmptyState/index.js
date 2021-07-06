import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'

import './style.css'

const SearchEmptyState = () => {
  return (
    <div className="search-empty">
      <div>
        <h5>Woah there ...</h5>
        <p>I’m not that prolific. Search for something more reasonable.</p>
      </div>
      <div className="search-empty__img">
        <StaticImage src="../../images/sal.png" alt="A dinosaur" placeholder="sources" layout="fixed" height={341} />
      </div>
    </div>
  )
}

export default SearchEmptyState
