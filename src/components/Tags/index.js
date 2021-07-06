import React from 'react'

import './style.css'

const Tags = ({ tags }) => {
  if (!tags) {
    return null
  }

  return (
    <div className="tags">
      {tags &&
        tags.map(tag => (
          <div key={tag} className="tags__tag" itemProp="about">
            {tag}
          </div>
        ))}
    </div>
  )
}

export default Tags
