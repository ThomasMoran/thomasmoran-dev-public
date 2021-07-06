import { useStaticQuery, graphql, Link } from 'gatsby'
import React from 'react'

import './style.css'

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            summary
          }
        }
      }
    }
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata?.author

  return (
    <div className="bio">
      <div className="bio__dots">
        <span />
        <span />
        <span />
      </div>
      <h4>Hi, I'm {author?.name}</h4>
      <p>
        I’m a Software Developer and Engineering Advocate current working for Deloitte Digital in Ireland. If you are one of the lucky ones to land
        here, please sign my <Link to="/guestbook">Guestbook</Link>.
      </p>
    </div>
  )
}

export default Bio
