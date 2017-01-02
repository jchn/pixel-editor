import React from 'react'
import { drawCellUsingContext } from '../utils'

const getPixelIndex = (width, height, scale, x, y) => {
    const indexX = Math.floor(x / scale)
    const indexY = Math.floor(y / scale)

    return indexY * width + indexX
}

class Canvas extends React.Component {
  assignCanvas = (el) => {
    console.log('el', el)
    if (!el) return
    this.ctx = el.getContext('2d')
    this.canvas = el
  }

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

  onMouseMoveCanvas = (e) => {
    const { width, height, scale, interact } = this.props
    const bounds = this.canvas.getBoundingClientRect()
    const x = e.clientX - bounds.left
    const y = e.clientY - bounds.top

    if (this.mouseDown) {
      interact(getPixelIndex(width, height, scale, x, y))
    }
  }

  onMouseDownCanvas = (e) => {
    const { width, height, scale, interact } = this.props
    const bounds = this.canvas.getBoundingClientRect()
    const x = e.clientX - bounds.left
    const y = e.clientY - bounds.top
    interact(getPixelIndex(width, height, scale, x, y))
    this.mouseDown = true
  }

  onMouseUpCanvas = (e) => {
    this.mouseDown = false
  }

  render () {
    const { width, height, scale, ...props } = this.props
    return (
      <canvas
        width={width * scale}
        height={height * scale}
        ref={this.assignCanvas}
        onMouseDown={this.onMouseDownCanvas}
        onMouseUp={this.onMouseUpCanvas}
        onMouseMove={this.onMouseMoveCanvas}
        style={{ backgroundColor: 'white',  userDrag: 'none', width: `${width * scale}px`, height: `${height * scale}px` }}
        {...props}
      ></canvas>
    )
  }
}

export default Canvas
