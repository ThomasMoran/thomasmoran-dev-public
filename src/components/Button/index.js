import { Link } from 'gatsby'
import React from 'react'

import Icon from '../Icon'
import './style.css'

const Button = ({ children, onClick, to, newTab, icon, small, large, type, secondary, customClass = '' }) => {
  if (to) {
    if (newTab) {
      return (
        <a className={`button${small ? ' button--small' : ''}`} href={to} target="_blank" rel="noopenner noreferrer">
          {children}
          {icon && <Icon name="Star" size="xsmall" customClass="git-like__button__icon" />}
        </a>
      )
    }
    return (
      <Link className={`button${small ? ' button--small' : ''}`} to={to}>
        {children}
        {icon && <Icon name="Star" size="xsmall" customClass="git-like__button__icon" />}
      </Link>
    )
  }
  return (
    <button
      className={`button${small ? ' button--small' : ''}${large ? ' button--large' : ''}${secondary ? ' button--secondary' : ''} ${customClass}`}
      type={type}
      onClick={onClick}
    >
      {children}
      {icon && <Icon name="Star" size="xsmall" customClass="git-like__button__icon" />}
    </button>
  )
}

export default Button
