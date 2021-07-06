import React from 'react'

import './style.css'

const CanvasGallery = ({ data }) => {
  return (
    <div className="gallery">
      <h3 className="gallery__title">Gallery</h3>
      <div className="gallery__grid">
        {data.map(item => (
          <div className="gallery__drawing" key={item.name + item.imageURL.substring(50, 60)}>
            <img src={item.imageURL} alt="" />
            {item.name && <span className="gallery__image__name">{item.name}</span>}
          </div>
        ))}
      </div>
    </div>
  )
}

export default CanvasGallery
