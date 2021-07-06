import { motion } from 'framer-motion'
import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import { throttle } from 'throttle-debounce'

import useWindowSize from '../../hooks/useWindowSize'
import Coffee from '../../images/canvas/body/Coffee.svg'
import CrossedArms from '../../images/canvas/body/CrossedArms.svg'
import Killer from '../../images/canvas/body/Killer.svg'
import PlainTee from '../../images/canvas/body/PlainTee.svg'
import ThunderTee from '../../images/canvas/body/ThunderTee.svg'
import Afro from '../../images/canvas/head/Afro.svg'
import Bald from '../../images/canvas/head/Bald.svg'
import Bun from '../../images/canvas/head/Bun.svg'
import Mohawk from '../../images/canvas/head/Mohawk.svg'
import Pomp from '../../images/canvas/head/Pomp.svg'
import { sleep } from '../../utils'
import Button from '../Button'
import CanvasGallery from '../CanvasGallery'
import './style.css'

const Canvas = () => {
  // hard coded data to loop over
  const canvasColors = ['#616161', '#9af2e2', '#fe8a8a', '#aedffd']
  const heads = [
    { img: Bun, alt: 'Head with bun hair' },
    { img: Afro, alt: 'Head with afro hair' },
    { img: Bald, alt: 'Head with no hair' },
    { img: Mohawk, alt: 'Head with mohawk hair' },
    { img: Pomp, alt: 'Head with short hair' },
  ]
  const bodies = [
    { img: Coffee, alt: 'Body holding coffee cup' },
    { img: CrossedArms, alt: 'Body with arms crossed' },
    { img: Killer, alt: 'Body holding a knife' },
    { img: PlainTee, alt: 'BLod with plain tshirt' },
    { img: ThunderTee, alt: 'Body wearing thunder bolt thsirt' },
  ]

  const windowSize = useWindowSize()

  // state
  const [name, setName] = useState('')
  const [isDrawing, setIsDrawing] = useState(false)
  const [selectedColor, setSelectedColor] = useState(canvasColors[0])
  const [selectedHead, setSelectedHead] = useState()
  const [selectedBody, setSelectedBody] = useState()
  const [loadedImages, setLoadedImages] = useState()
  const [submitted, setSubmitted] = useState(false)

  // Use ref instead of state so data will remain between re-renders and available in listeners
  const canvasRef = useRef(null)
  const contextRef = useRef(null)
  const strokesRef = useRef([])

  // animations
  const variants = {
    open: {
      transition: { staggerChildren: 0.07, delayChildren: 0.2 },
    },
    closed: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
  }
  const buttonVariants = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100 },
      },
    },
    closed: {
      y: 50,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 },
      },
    },
  }

  useEffect(() => {
    // fetch images from api
    fetch('/api/guestbook')
      .then(response => response.json())
      .then(data => setLoadedImages(data))
  }, [])

  useEffect(() => {
    // prevent scroll while drawing with touch
    document.body.addEventListener('touchstart', preventScroll, { passive: false })
    document.body.addEventListener('touchend', preventScroll, { passive: false })
    document.body.addEventListener('touchmove', preventScroll, { passive: false })
    return () => {
      document.body.removeEventListener('touchstart', preventScroll)
      document.body.removeEventListener('touchend', preventScroll)
      document.body.removeEventListener('touchmove', preventScroll)
    }
  }, [])

  const preventScroll = e => {
    if (e.target == canvasRef.current) e.preventDefault()
  }

  const handleColorSelect = e => {
    setSelectedColor(e.target.value)
  }

  // Drawing

  // set up the drawing canvas
  useEffect(() => {
    if (canvasRef.current && windowSize.width) {
      const canvas = canvasRef.current
      const widthBase = windowSize.width < 400 ? '300px' : '400px'
      canvas.width = windowSize.width < 400 ? 600 : 800 // for double pixel density
      canvas.height = windowSize.width < 400 ? 600 : 800
      canvas.style.width = widthBase
      canvas.style.height = widthBase

      const ctx = canvasRef.current.getContext('2d')
      ctx.scale(2, 2) // for double pixel density
      ctx.strokeStyle = selectedColor // set intial draw color
      ctx.lineJoin = 'round'
      ctx.lineCap = 'round'
      ctx.lineWidth = 2
      contextRef.current = ctx
    }
  }, [windowSize.width])

  // add images to canvas once they are selected
  useEffect(() => {
    if (selectedHead && selectedBody) {
      addImages()
    }
  }, [selectedHead, selectedBody])

  // drawing touch event handlers
  const startDrawingTouch = e => {
    const canvasRect = canvasRef.current.getBoundingClientRect()
    const offsetX = e.touches[0].clientX - canvasRect.left
    const offsetY = e.touches[0].clientY - canvasRect.top
    startDrawing({ nativeEvent: { offsetX, offsetY } }) // match the param name for DRY code
  }

  const drawTouch = e => {
    const canvasRect = canvasRef.current.getBoundingClientRect()
    const offsetX = e.touches[0].clientX - canvasRect.left
    const offsetY = e.touches[0].clientY - canvasRect.top
    draw({ nativeEvent: { offsetX, offsetY } }) // match the param name for DRY code
  }

  // drawing mouse event handlers
  const startDrawing = e => {
    const { offsetX, offsetY } = e.nativeEvent
    contextRef.current.strokeStyle = selectedColor // reset color to chosen value
    contextRef.current.beginPath()
    contextRef.current.moveTo(offsetX, offsetY)
    setIsDrawing(true)

    // add new stroke to array
    strokesRef.current.push({
      color: selectedColor,
      points: [],
    })
  }

  const stopDrawing = () => {
    contextRef.current.closePath()
    setIsDrawing(false)
  }

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return
    const { offsetX, offsetY } = nativeEvent
    contextRef.current.lineTo(offsetX, offsetY)
    contextRef.current.stroke()
    throttleSaveCoordinate(offsetX, offsetY) // no need to save every coordinate
  }

  const throttleSaveCoordinate = throttle(50, (x, y) => {
    // add point to last created stroke
    strokesRef.current[strokesRef.current.length - 1].points.push([x, y])
  })

  const addImage = (imgUrl, coords) => {
    const [sx, sy, sWidth, sHeight] = coords
    const ctx = contextRef.current
    const img = new Image()
    img.src = imgUrl
    img.onload = () => {
      ctx.drawImage(img, sx, sy, sWidth, sHeight)
    }
  }

  const addImages = () => {
    // image position is slightly altered for mobile
    if (windowSize.width < 400) {
      addImage(selectedHead, [150 * 0.75, 80 * 0.75, 110 * 0.75, 110 * 0.75])
      addImage(selectedBody, [120 * 0.75, 168 * 0.75, 154 * 0.75, 154 * 0.75])
    } else {
      addImage(selectedHead, [150, 80, 110, 110])
      addImage(selectedBody, [120, 168, 154, 154])
    }
  }

  const clearCanvas = (addImg = true) => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    contextRef.current = ctx

    if (addImg && selectedHead && selectedBody) {
      addImages()
    }
  }

  // set canvas and selected images
  const restart = () => {
    clearCanvas(false)
    setSelectedHead('')
    setSelectedBody('')
    strokesRef.current = []
  }

  const setHead = headImgUrl => {
    setSelectedHead(headImgUrl)
  }

  const setBody = bodyImgUrl => {
    setSelectedBody(bodyImgUrl)
  }

  const save = () => {
    const data = {
      name,
      imageURI: canvasRef.current.toDataURL(),
    }

    // submit to backend
    fetch('/api/guestbook', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).catch(error => {
      console.error('Error: ', error)
    })

    //reset
    setSubmitted(true)
    restart()
  }

  return (
    <div className="canvas">
      <h1 className="canvas__title title--callout">{`It's a blank <canvas>`}</h1>
      <p className="canvas__description">
        My guestbook is a collection of drawings and greetings from you lovely people. Click <i>submit</i> to save your masterpiece!
      </p>

      {submitted && (
        <div className="canvas__selector">
          <h4 className="canvas__selector__title">Thanks!</h4>
          <p>
            I obviously have to review the submission. The internet cannot be trusted.
            <br /> In the meantime check out all the other creations below{' '}
            <span role="img" aria-label="hand pointing down emoji">
              👇
            </span>
            .
          </p>
        </div>
      )}

      {!submitted && (
        <>
          <div className="canvas__selector">
            {!selectedHead && !selectedBody && (
              <div className="canvas__selector__section">
                <h3 className="canvas__selector__title">Choose your head</h3>
                <motion.div className="canvas__selector__heads" initial="closed" animate="open" variants={variants}>
                  {heads.map(head => (
                    <motion.button
                      key={head.alt}
                      variants={buttonVariants}
                      whileHover={{
                        scale: 1.05,
                      }}
                      className="canvas__selector__head"
                      type="button"
                      onClick={() => setHead(head.img)}
                    >
                      <img src={head.img} alt={head.alt} />
                    </motion.button>
                  ))}
                </motion.div>
              </div>
            )}

            {selectedHead && !selectedBody && (
              <div className="canvas__selector__section">
                <h3 className="canvas__selector__title">Choose your body</h3>
                <motion.div className="canvas__selector__heads" initial="closed" animate="open" variants={variants}>
                  {bodies.map(body => (
                    <motion.button
                      key={body.alt}
                      variants={buttonVariants}
                      whileHover={{
                        scale: 1.05,
                      }}
                      className="canvas__selector__body"
                      type="button"
                      onClick={() => setBody(body.img)}
                    >
                      <img src={body.img} alt={body.alt} />
                    </motion.button>
                  ))}
                </motion.div>
              </div>
            )}

            <motion.div
              className={`canvas__selector__section--draw ${selectedHead && selectedBody ? 'show' : 'hide'}`}
              initial="closed"
              animate={selectedHead && selectedBody ? 'open' : 'closed'}
            >
              <h3 className="canvas__selector__title">Decorate your avatar</h3>
              <Button customClass="canvas__selector__restart" onClick={restart} small secondary>
                Or Start Again
              </Button>
              <motion.div variants={buttonVariants}>
                <canvas
                  className="canvas__main"
                  onMouseDown={startDrawing}
                  onMouseUp={stopDrawing}
                  onMouseMove={draw}
                  onTouchStart={startDrawingTouch}
                  onTouchEnd={stopDrawing}
                  onTouchMove={drawTouch}
                  ref={canvasRef}
                />
              </motion.div>
              <motion.nav className="canvas__controls" variants={variants}>
                <motion.div className="canvas__controls__colors" variants={variants}>
                  {canvasColors.map(color => (
                    <motion.button
                      key={color}
                      variants={buttonVariants}
                      className={selectedColor === color ? 'selected' : ''}
                      value={color}
                      onClick={handleColorSelect}
                    />
                  ))}
                </motion.div>
                <motion.div variants={buttonVariants}>
                  <Button onClick={clearCanvas} small secondary>
                    Clear
                  </Button>
                </motion.div>
              </motion.nav>
            </motion.div>
          </div>

          {selectedHead && selectedBody && (
            <div className="canvas__form">
              <motion.input
                whileFocus={{ scale: 1.01 }}
                transition={{ duration: 0.2, type: 'spring', bounce: 0.25 }}
                type="text"
                name="name"
                autocomplete="off"
                maxLength="20"
                placeholder="Name ( optional )"
                required
                value={name}
                onChange={e => setName(e.target.value)}
              />
              <Button large onClick={save}>
                Submit
              </Button>
            </div>
          )}
        </>
      )}

      <hr />

      {loadedImages && <CanvasGallery data={loadedImages} />}
    </div>
  )
}

export default Canvas
