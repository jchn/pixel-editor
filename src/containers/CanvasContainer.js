import React, { Component } from 'react'
import { connect } from 'react-redux'
import { values } from 'ramda'
import Canvas from '../components/Canvas'
import { actions as storeActions } from '../redux/modules/store'
import { actions as pointerActions } from '../redux/modules/pointer'
import PointableGrid from '../components/PointableGrid'

const mapStateToProps = (state) => {
  return {
    pixels: values(state.store.present.layers.ids)
      .reverse()
      .map(id => state.store.present.layers.byId[id])
      .filter(layer => layer.isVisible)
      .map(layer => layer.pixels)
      .reduce((a, b) => a.concat(b), []),
    currentLayerId: state.layers.selectedLayerId,
    currentColor: state.colors.currentColor
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    draw: (layerId, color) => (e, pixelIndex) => dispatch(storeActions.drawPixel({ color, layerId, index: pixelIndex })),
    drawPreviewPixel: pixelIndex => dispatch(storeActions.drawPreviewPixel({ index: pixelIndex })),
    updateCurrentPixelIndex: (e, pixelIndex) => dispatch(pointerActions.updateCurrentPixelIndex(pixelIndex)),
    setPointerDown: isPointerDown => (e, pixelIndex) => dispatch(pointerActions.setPointerDown({isPointerDown, pixelIndex}))
  }
}

class CanvasContainer extends Component {
  render () {
    const { pixels, draw, drawPreviewPixel, currentLayerId, currentColor, updateCurrentPixelIndex, setPointerDown, ...props } = this.props
    return (
      <PointableGrid
        width={16}
        height={16}
        scale={32}
        onPointerDown={setPointerDown(true)}
        onPointerUp={setPointerDown(false)}
        onPointerCancel={setPointerDown(false)}
        onPointerMove={updateCurrentPixelIndex}
      >
        <Canvas
          width={16}
          height={16}
          scale={32}
          pixels={pixels}
          onHover={drawPreviewPixel}
          {...props} />
        </PointableGrid>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CanvasContainer)
