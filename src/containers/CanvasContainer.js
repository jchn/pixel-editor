import React, { Component } from 'react'
import { connect } from 'react-redux'
import { values } from 'ramda'
import Canvas from '../components/Canvas'
import { actions as storeActions } from '../redux/modules/store'

const mapStateToProps = (state) => {
  return {
    pixels: values(state.store.layers.ids).map(id => state.store.layers.byId[id]).map(layer => layer.pixels).reduce((a, b) => a.concat(b), []),
    currentLayerId: state.layers.selectedLayerId,
    currentColor: state.colors.currentColor
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    draw: (layerId, color) => (pixelIndex) => dispatch(storeActions.drawPixel({ color, layerId, index: pixelIndex }))
  }
}

class CanvasContainer extends Component {
  render () {
    const { pixels, draw, currentLayerId, currentColor, ...props } = this.props
    return (
      <Canvas
        width={16}
        height={16}
        scale={32}
        pixels={pixels}
        interact={draw(currentLayerId, currentColor)}
        {...props} />
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CanvasContainer)
