import React, { Component } from 'react'
import { connect } from 'react-redux'
import { values } from 'ramda'
import Canvas from '../components/Canvas'

const mapStateToProps = (state) => {
  return {
    pixels: values(state.store.layers.byId).map(layer => layer.pixels).reduce((a, b) => a.concat(b), [])
  }
}

class CanvasContainer extends Component {
  render () {
    const { pixels } = this.props
    return (
      <Canvas width={16} height={16} scale={32} pixels={pixels} />
    )
  }
}

export default connect(mapStateToProps)(CanvasContainer)
