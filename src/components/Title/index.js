import React from 'react'

const Title = ({ title, children }) => {
  return (
    <div>
      <h2 style={{ marginTop: 0 }}>{title}</h2>
      {children}
    </div>
  )
}

export default Title
