import React from 'react'
import { drawCellUsingContext } from '../utils'

class Canvas extends React.Component {
  assignCanvas = (el) => {
    this.ctx = el.getContext('2d')
    this.canvas = el
  }

  componentDidMount () {
    this.drawPixels()
  }

  componentDidUpdate () {
    this.drawPixels()
  }

  drawPixels () {
    const { pixels, width, height, scale } = this.props

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
    const { width, height, scale, ...props } = this.props
    return (
      <canvas
        width={width * scale}
        height={height * scale}
        ref={this.assignCanvas}
        style={{ backgroundColor: 'white', width: `${width * scale}px`, height: `${height * scale}px` }}
        {...props}
      ></canvas>
    )
  }
}

export default Canvas
