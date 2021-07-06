import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'gatsby'
import React, { useEffect, useState } from 'react'

import { getCookieValue, setCookie } from '../../utils'
import Button from '../Button'
import CookieIcon from '../CookieIcon'
import './style.css'

const Cookie = () => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const consent = getCookieValue('consent')

    if (!consent) {
      setTimeout(() => {
        setShow(true)
      }, 200)
    } else if (consent === 'denied' && window.gaOptout) {
      window.gaOptout()
    }
  }, [])

  const modalAnimation = {
    hidden: {
      y: '120%',
      opacity: 0,
      transition: { type: 'spring', duration: 0.3, bounce: 0.3 },
    },
    visible: {
      y: '0',
      opacity: 1,
      transition: { type: 'spring', duration: 0.4, bounce: 0.4 },
    },
  }

  const handleAccept = () => {
    setShow(false)
    setCookie('consent', 'granted')
  }

  const handleDeny = () => {
    setShow(false)
    if (window.gaOptout) window.gaOptout()
    setCookie('consent', 'denied')
  }
  return (
    <AnimatePresence exitBeforeEnter>
      {show && (
        <motion.div className="cookie" variants={modalAnimation} initial="hidden" animate="visible" exit="hidden">
          <div className="cookie__icons">
            <CookieIcon />
            <CookieIcon />
          </div>
          <p>
            I use come cookies to help analyse how my site is doing. See the <Link to="/privacy-policy">privacy policy</Link> for more.
          </p>
          <div className="cookie__buttons">
            <Button small secondary onClick={handleDeny}>
              No Thanks
            </Button>
            <Button small onClick={handleAccept}>
              That's OK
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Cookie
