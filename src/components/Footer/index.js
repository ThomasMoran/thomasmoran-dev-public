import { useStaticQuery, graphql, Link } from 'gatsby'
import React from 'react'

import Icon from '../Icon'
import LikeMySite from '../LikeMySite'
import './style.css'

const Footer = () => {
  const data = useStaticQuery(graphql`
    query FooterQuery {
      site {
        siteMetadata {
          social {
            repo
            repoAPI
          }
        }
      }
    }
  `)
  return (
    <footer className="footer">
      <svg id="footer__wave" viewBox="0 0 1440 190" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <path
          fill="#272727"
          d="M0,76L40,63.3C80,51,160,25,240,22.2C320,19,400,38,480,60.2C560,82,640,108,720,126.7C800,146,880,158,960,152C1040,146,1120,120,1200,117.2C1280,114,1360,133,1440,133C1520,133,1600,114,1680,107.7C1760,101,1840,108,1920,95C2000,82,2080,51,2160,38C2240,25,2320,32,2400,28.5C2480,25,2560,13,2640,25.3C2720,38,2800,76,2880,91.8C2960,108,3040,101,3120,85.5C3200,70,3280,44,3360,44.3C3440,44,3520,70,3600,66.5C3680,63,3760,32,3840,15.8C3920,0,4000,0,4080,15.8C4160,32,4240,63,4320,82.3C4400,101,4480,108,4560,101.3C4640,95,4720,76,4800,69.7C4880,63,4960,70,5040,60.2C5120,51,5200,25,5280,34.8C5360,44,5440,89,5520,107.7C5600,127,5680,120,5720,117.2L5760,114L5760,190L5720,190C5680,190,5600,190,5520,190C5440,190,5360,190,5280,190C5200,190,5120,190,5040,190C4960,190,4880,190,4800,190C4720,190,4640,190,4560,190C4480,190,4400,190,4320,190C4240,190,4160,190,4080,190C4000,190,3920,190,3840,190C3760,190,3680,190,3600,190C3520,190,3440,190,3360,190C3280,190,3200,190,3120,190C3040,190,2960,190,2880,190C2800,190,2720,190,2640,190C2560,190,2480,190,2400,190C2320,190,2240,190,2160,190C2080,190,2000,190,1920,190C1840,190,1760,190,1680,190C1600,190,1520,190,1440,190C1360,190,1280,190,1200,190C1120,190,1040,190,960,190C880,190,800,190,720,190C640,190,560,190,480,190C400,190,320,190,240,190C160,190,80,190,40,190L0,190Z"
        />
      </svg>
      <div className="footer__wrapper">
        <div className="footer__container">
          <div className="footer__main">
            <div className="footer__page-list">
              <Link to="/">Home</Link>
              <Link to="/blog">Blog</Link>
              <Link to="/snippits">Code Snippits</Link>
              <Link to="/guestbook">Guestbook</Link>
              <Link to="/privacy-policy">Privacy Policy</Link>
            </div>
            <div className="footer__github">
              <LikeMySite repo={data.site.siteMetadata.social.repo} repoAPI={data.site.siteMetadata.social.repoAPI} />
            </div>
          </div>
          <div className="footer__copy">
            © {new Date().getFullYear()}, Thomas Moran. All rights reserved.
            <Icon name="Coffee" size="xsmall" />
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
