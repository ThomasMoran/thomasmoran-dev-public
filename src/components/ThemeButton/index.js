import { motion, useAnimation } from 'framer-motion'
import React, { useState } from 'react'

import Icon from '../Icon'
import './style.css'

const ThemeButton = () => {
  // get the theme from localStorage
  const isBrowser = () => typeof window !== 'undefined'
  const [theme, setTheme] = useState(isBrowser() ? localStorage.getItem('theme') : 'light')
  const controls = useAnimation()
  const paths = [
    'M58.1,-58.4C74.1,-42.1,84.9,-21.1,84,-0.9C83.1,19.3,70.5,38.5,54.5,51.8C38.5,65,19.3,72.2,0.3,72C-18.8,71.7,-37.5,64,-50.8,50.8C-64.2,37.5,-72.1,18.8,-74.3,-2.3C-76.6,-23.3,-73.2,-46.6,-59.9,-62.9C-46.6,-79.1,-23.3,-88.3,-1.1,-87.2C21.1,-86.1,42.1,-74.7,58.1,-58.4Z',
    'M60.1,-57.1C76,-44.2,85.6,-22.1,84.9,-0.8C84.1,20.6,73,41.2,57.1,56.9C41.2,72.5,20.6,83.3,-1.2,84.4C-23,85.6,-45.9,77.3,-60.3,61.6C-74.7,45.9,-80.4,23,-80.7,-0.3C-81,-23.6,-75.9,-47.1,-61.5,-60C-47.1,-72.9,-23.6,-75.1,-0.7,-74.4C22.1,-73.7,44.2,-70,60.1,-57.1Z',
    'M60.5,-62.9C74.6,-46.3,79.8,-23.2,79.9,0C79.9,23.2,74.7,46.4,60.6,59.3C46.4,72.2,23.2,74.8,2.4,72.4C-18.4,70.1,-36.9,62.7,-51.8,49.8C-66.7,36.9,-78.1,18.4,-78.3,-0.2C-78.5,-18.8,-67.4,-37.5,-52.5,-54.1C-37.5,-70.7,-18.8,-85,2.2,-87.2C23.2,-89.4,46.3,-79.4,60.5,-62.9Z',
    'M58.4,-60.2C72.9,-43.8,80.1,-21.9,78.3,-1.8C76.4,18.3,65.7,36.6,51.1,49.6C36.6,62.6,18.3,70.4,-2.2,72.6C-22.7,74.8,-45.4,71.5,-60.5,58.4C-75.5,45.4,-82.8,22.7,-80.6,2.3C-78.3,-18.2,-66.4,-36.4,-51.4,-52.7C-36.4,-69,-18.2,-83.5,1.9,-85.4C21.9,-87.2,43.8,-76.5,58.4,-60.2Z',
    'M54.1,-53.2C69.9,-38.4,82.2,-19.2,83.1,0.9C83.9,21,73.4,41.9,57.7,58.4C41.9,74.9,21,86.9,-0.9,87.8C-22.8,88.7,-45.5,78.5,-61.7,62C-77.8,45.5,-87.3,22.8,-86.7,0.6C-86.2,-21.7,-75.6,-43.3,-59.4,-58.1C-43.3,-72.9,-21.7,-80.9,-1.2,-79.6C19.2,-78.4,38.4,-68,54.1,-53.2Z',
    'M50.1,-52C64.4,-35.7,75.3,-17.9,77.1,1.8C78.9,21.5,71.6,42.9,57.3,56.5C42.9,70.1,21.5,75.9,1.8,74.1C-17.8,72.2,-35.7,62.9,-49.1,49.3C-62.5,35.7,-71.5,17.8,-73,-1.5C-74.5,-20.8,-68.4,-41.6,-55,-57.8C-41.6,-74.1,-20.8,-86,-1.5,-84.5C17.9,-83,35.7,-68.3,50.1,-52Z',
  ]
  const xRange = [0, 0, 0, 1, -1, 1]
  const yRange = [-2, 2, 0, 1, 2, 0]

  // set theme on page load
  if (isBrowser() && localStorage) {
    const t = isBrowser() ? localStorage.getItem('theme') || 'light' : 'light'
    document.documentElement.setAttribute('data-theme', t)
  }

  // start animation
  controls.start({
    d: paths,
  })

  const switchTheme = e => {
    const mode = theme === 'dark' ? 'light' : 'dark'
    document.documentElement.setAttribute('data-theme', mode)
    isBrowser() && localStorage.setItem('theme', mode)
    setTheme(mode)
  }

  return (
    <motion.button className="theme-button" role="button" onClick={switchTheme} whileTap={{ scale: 0.9 }}>
      <svg width="50" height="50" viewBox="10 20 175 160" fill="none" xmlns="http://www.w3.org/2000/svg">
        <motion.path
          initial={{ d: paths[0] }}
          animate={controls}
          transition={{ duration: 6, ease: 'linear', repeat: Infinity, repeatType: 'reverse' }}
          transform="translate(100 100)"
          fill-rule="evenodd"
          clip-rule="evenodd"
          fill="url(#a)"
        />
        <defs>
          <linearGradient id="a" x1="0" y1="0" x2="50" y2="50" gradientUnits="userSpaceOnUse">
            <stop stopColor="var(--color-gradient-button-start)" />
            <stop offset="1" stopColor="var(--color-gradient-button-stop)" />
          </linearGradient>
        </defs>
      </svg>
      <motion.div
        className="theme-button__icon-wrapper"
        initial={{ x: xRange[0], y: yRange[0] }}
        animate={{ x: xRange, y: yRange }}
        transition={{ duration: 6, ease: 'linear', repeat: Infinity, repeatType: 'reverse' }}
      >
        {theme === 'dark' ? (
          <Icon name="Sun" size="small" customClass="theme-button__icon" />
        ) : (
          <Icon name="Moon" size="small" customClass="theme-button__icon" />
        )}
      </motion.div>
    </motion.button>
  )
}

export default ThemeButton
