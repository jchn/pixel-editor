import React from 'react'
import { connect } from 'react-redux'
import Canvas from '../components/Canvas'

function mapStateToProps (state) {
  return {
    pixels: [...state.store.present.canvases.byId[state.store.present.frames.byId[state.sequencer.currentFrameId].canvas].layers]
      .reverse()
      .map(id => state.store.present.layers.byId[id])
      .filter(layer => layer.isVisible)
      .map(layer => layer.pixels)
      .reduce((a, b) => a.concat(b), [])
  }
}

const SequencePreview = ({ pixels }) => {
  return (
    <Canvas pixels={pixels} width={16} height={16} scale={8} style={{ borderRadius: '3px' }} />
  )
}

export default connect(mapStateToProps)(SequencePreview)
