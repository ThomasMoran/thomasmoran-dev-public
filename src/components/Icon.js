import React from 'react'
import * as Icon from 'react-feather'

const SIcon = ({ name, size = 'medium', customClass }) => {
  const DynamicIcon = Icon[name]

  const sizeMap = {
    xsmall: 14,
    small: 22,
    medium: 24,
    large: 28,
  }

  return <DynamicIcon className={customClass} size={sizeMap[size]} />
}

export default SIcon
