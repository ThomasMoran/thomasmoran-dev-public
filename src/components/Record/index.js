import React from 'react'

import './style.css'

const Record = ({ imageUrl = '', isPlaying }) => {
  return (
    <div className={`record${isPlaying ? '' : ' record--stopped'}`}>
      {imageUrl && <img className="record__img" src={imageUrl} alt="album or song artwork" />}
      <span className="record__center__black" />
      <span className="record__center__white" />
    </div>
  )
}

export default Record
