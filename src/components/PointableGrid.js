import React, { PropTypes } from 'react'
import Pointable from './Pointable'
import styled from 'styled-components'

const Grid = styled.div`
  width: ${({ width, scale }) => width * scale }px;
  height: ${({ height, scale }) => height * scale}px;
`

const getPixelIndex = (width, height, scale, x, y) => {
    const indexX = Math.floor(x / scale)
    const indexY = Math.floor(y / scale)

    return indexY * width + indexX
}

const handleEvent = (event, width, height, scale, callback) => {
  const bounds = event.target.getBoundingClientRect()
  const x = event.clientX - bounds.left
  const y = event.clientY - bounds.top
  callback(event, getPixelIndex(width, height, scale, x, y))
}

const onPointerEventFnCreator = ({ width, height, scale }, cb) => e => handleEvent(e, width, height, scale, cb)

const PointableGrid = ({
  width,
  height,
  scale,
  children,
  onPointerMove,
  onPointerDown,
  onPointerUp,
  onPointerOver,
  onPointerOut,
  onPointerEnter,
  onPointerLeave,
  onPointerCancel
}) => {

  return (
    <Pointable
      onPointerMove={onPointerEventFnCreator({ width, height, scale }, onPointerMove)}
      onPointerDown={onPointerEventFnCreator({ width, height, scale }, onPointerDown)}
      onPointerUp={onPointerEventFnCreator({ width, height, scale }, onPointerUp)}
      onPointerOver={onPointerEventFnCreator({ width, height, scale }, onPointerOver)}
      onPointerOut={onPointerEventFnCreator({ width, height, scale }, onPointerOut)}
      onPointerEnter={onPointerEventFnCreator({ width, height, scale }, onPointerEnter)}
      onPointerLeave={onPointerEventFnCreator({ width, height, scale }, onPointerLeave)}
      onPointerCancel={onPointerEventFnCreator({ width, height, scale }, onPointerCancel)}
    >
      <Grid width={width} height={height} scale={scale}>
        {children}
      </Grid>
    </Pointable>
  )

}

PointableGrid.propTypes = {
  onPointerMove: PropTypes.func,
  onPointerDown: PropTypes.func,
  onPointerUp: PropTypes.func,
  onPointerOver: PropTypes.func,
  onPointerOut: PropTypes.func,
  onPointerEnter: PropTypes.func,
  onPointerLeave: PropTypes.func,
  onPointerCancel: PropTypes.func
}

const noop = function () {}

PointableGrid.defaultProps = {
  onPointerMove: noop,
  onPointerDown: noop,
  onPointerUp: noop,
  onPointerOver: noop,
  onPointerOut: noop,
  onPointerEnter: noop,
  onPointerLeave: noop,
  onPointerCancel: noop
}

export default PointableGrid
