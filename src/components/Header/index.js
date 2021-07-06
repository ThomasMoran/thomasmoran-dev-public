import { useStaticQuery, graphql, Link } from 'gatsby'
import React from 'react'

import HomeIcon from '../HomeIcon'
import Icon from '../Icon'
import ThemeButton from '../ThemeButton'
import './style.css'

const Header = () => {
  const data = useStaticQuery(graphql`
    query HeaderQuery {
      site {
        siteMetadata {
          social {
            linkedin
            github
          }
        }
      }
    }
  `)

  return (
    <header className="header">
      <Link className="header__icon__home" to="/">
        <HomeIcon />
      </Link>
      <div className="header__icons">
        <a className="header__icon" href={data.site.siteMetadata.social.linkedin} target="_blank" rel="noopener noreferrer">
          <Icon name="Linkedin" />
        </a>
        <a className="header__icon" href={data.site.siteMetadata.social.github} target="_blank" rel="noopener noreferrer">
          <Icon name="GitHub" />
        </a>
        <ThemeButton />
      </div>
    </header>
  )
}

export default Header
