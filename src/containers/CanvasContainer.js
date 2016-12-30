import React, { Component } from 'react'
import { connect } from 'react-redux'
import { values } from 'ramda'
import Canvas from '../components/Canvas'
import { actions as storeActions } from '../redux/modules/store'

const mapStateToProps = (state) => {
  return {
    pixels: values(state.store.layers.byId).map(layer => layer.pixels).reduce((a, b) => a.concat(b), []),
    currentLayerId: state.layers.selectedLayerId
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    draw: (layerId) => (pixelIndex) => dispatch(storeActions.drawPixel({ color: 'red', layerId, index: pixelIndex }))
  }
}

class CanvasContainer extends Component {
  render () {
    const { pixels, draw, currentLayerId, ...props } = this.props
    return (
      <Canvas
        width={16}
        height={16}
        scale={32}
        pixels={pixels}
        interact={draw(currentLayerId)}
        {...props} />
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CanvasContainer)
