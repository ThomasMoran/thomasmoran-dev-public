import { motion } from 'framer-motion'
import React, { useState } from 'react'

import Button from '../Button'
import './style.css'

const ContactForm = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loadTime] = useState(new Date().getTime())

  const variants = {
    submit: {
      width: '45px',
      height: '45px',
      borderRadius: '50%',
    },
    default: { width: 'auto', height: 'auto', borderRadius: '8px' },
  }

  const resetForm = () => {
    setSubmitted(true)
    setName('')
    setEmail('')
    setMessage('')

    setTimeout(() => {
      setSubmitted(false)
    }, 2500)
  }

  const submit = e => {
    e.preventDefault()

    const timeDiff = new Date().getTime() - loadTime

    if (timeDiff > 3500 && name && email && message) {
      const formData = { 'form-name': 'contact', name, email, message }

      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString(),
      })
        .then()
        .catch(error => alert(error))
    }

    resetForm()
  }

  return (
    <div className="contact">
      <div className="contact__header">
        <h2 className="contact__header__title">Let's Talk</h2>
        <p className="contact__header__desc">
          If you would like to get in touch with me for any reason, please submit a query below and I will get back as soon as I can.
        </p>
      </div>
      <form className="contact__form" name="contact" data-netlify="true" onSubmit={submit}>
        <input type="hidden" name="form-name" value="contact" />
        <motion.input
          whileFocus={{ scale: 1.01 }}
          transition={{ duration: 0.2, type: 'spring', bounce: 0.25 }}
          className="contact__input"
          type="text"
          name="name"
          placeholder="Name"
          required
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <motion.input
          whileFocus={{ scale: 1.01 }}
          transition={{ duration: 0.2, type: 'spring', bounce: 0.25 }}
          className="contact__input"
          type="email"
          name="email"
          placeholder="Email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <motion.textarea
          whileFocus={{ scale: 1.01 }}
          transition={{ duration: 0.2, type: 'spring', bounce: 0.25 }}
          className="contact__input contact__input--ta"
          type="text"
          name="message"
          placeholder="Message"
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <div className="contact__submit">
          <motion.div
            className={`contact__submit__anim${submitted ? ' contact__submit__anim--sub' : ''}`}
            animate={submitted ? 'submit' : 'default'}
            variants={variants}
          >
            <Button large type="submit">
              Submit
            </Button>
          </motion.div>
          {submitted ? (
            <motion.span animate={{ x: '-20px', opacity: 1 }} className="contact__submit__thanks">
              Yay! Thanks
            </motion.span>
          ) : null}
        </div>
      </form>
    </div>
  )
}

export default ContactForm
