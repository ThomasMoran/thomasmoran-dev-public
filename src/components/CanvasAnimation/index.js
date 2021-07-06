import React from 'react'

const CanvasAnimation = ({ strokes, image }) => {
  const replayDrawing = async canvas => {
    // TODO playback the drawing
    // const ctx = canvas.getContext("2d")
    // ctx.scale(2, 2) // for double pixel density
    // ctx.lineJoin = "round"
    // ctx.lineCap = "round"
    // ctx.lineWidth = 2
    // for (let i = 0; i < strokesRef.current.length; i++) {
    //   const stroke = strokesRef.current[i]
    //   const firstPoint = stroke.points[0]
    //   let prevX = firstPoint[0]
    //   let prevY = firstPoint[1]
    //   ctx.beginPath()
    //   ctx.moveTo(prevX, prevY)
    //   ctx.strokeStyle = stroke.color
    //   for (let j = 0; j < stroke.points.length; j++) {
    //     const point = stroke.points[j]
    //     ctx.lineTo(point[0], point[1])
    //     ctx.stroke()
    //     await sleep(10)
    //   }
    //   ctx.closePath()
    // }
  }

  return (
    <div>
      <p>1</p>
    </div>
  )
}

export default CanvasAnimation
