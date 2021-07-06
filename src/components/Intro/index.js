import { Link } from 'gatsby'
import React from 'react'

import Peep from '../Peep'
import WaveIcon from '../WaveIcon'
import './style.css'

const Intro = () => {
  return (
    <section className="intro">
      <div className="intro__details">
        <h1>
          Hey, I'm Tom <WaveIcon size={20} />
        </h1>
        <h2>
          I’m a <span className="title--callout">Software Developer</span> and Engineering Advocate
        </h2>
        <p>
          I'm current working for <a href="https://www.deloittedigital.com/">Deloitte Digital</a> in Ireland. If you are one of the lucky ones to land
          here, why not sign my <Link to="/guestbook">Guestbook</Link>!
        </p>
      </div>
      <div className="intro__peep">
        <Peep />
      </div>
    </section>
  )
}

export default Intro
