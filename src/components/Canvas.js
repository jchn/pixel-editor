import React, { Component, PropTypes } from 'react'
import { drawCellUsingContext } from '../utils'
import Pointable from './Pointable'

const getPixelIndex = (width, height, scale, x, y) => {
    const indexX = Math.floor(x / scale)
    const indexY = Math.floor(y / scale)

    return indexY * width + indexX
}

class Canvas extends React.Component {
  componentDidMount () {
    this.drawPixels()
  }

  componentDidUpdate () {
    this.drawPixels()
  }

  clearCanvas () {
    const { width, height, scale } = this.props
    this.ctx.clearRect(0, 0, width * scale, height * scale)
  }

  drawPixels () {
    const { pixels, width, height, scale } = this.props
    this.clearCanvas()
    pixels.forEach((value, index) => {
      drawCellUsingContext(
        this.ctx,
        scale,
        index % width,
        Math.floor(index / width) % height,
        value ? value : 'rgba(0, 0, 0, 0)'
      )
    })
  }

  render () {
    const { width, height, scale } = this.props

    const assignCanvas = el => {
      if (!el) return
      this.canvas = el
      this.ctx = el.getContext('2d')
    }

    return (
      <canvas
        width={width * scale}
        height={height * scale}
        ref={assignCanvas}
        style={{ backgroundColor: 'white',  userDrag: 'none', width: `${width * scale}px`, height: `${height * scale}px`, cursor: 'crosshair' }}
      ></canvas>
    )
  }
}

const noop = () => {}

Canvas.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  scale: PropTypes.number.isRequired
}

Canvas.defaultProps = {

}

export default Canvas
