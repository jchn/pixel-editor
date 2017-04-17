import React from 'react'
import { connect } from 'react-redux'
import SequenceList from '../components/SequenceList'
import Canvas from '../components/Canvas'
import { actions as sequencerActions } from '../redux/modules/sequencer'

function mapStateToProps (state, ownProps) {
  return {
    pixels: state.store.present.canvases.byId[ownProps.frame.canvas].layers
      .map(layerId => state.store.present.layers.byId[layerId])
      .filter(layer => layer.isVisible)
      .reverse()
      .map(layer => layer.pixels)
      .reduce((a, b) => a.concat(b), []),
    selected: state.sequencer.selectedFrameId === ownProps.frame.id
  }
}

function mapDispatchToProps (dispatch, ownProps) {
  return {
    selectFrame: () => dispatch(sequencerActions.selectFrame(ownProps.frame.id))
  }
}

const SequenceListItemContainer = ({ selected, frame, pixels, selectFrame }) => (
  <SequenceList.Item onClick={selectFrame} selected={selected}>
    <Canvas width={16} height={16} scale={8} pixels={pixels} />
  </SequenceList.Item>
)

export default connect(mapStateToProps, mapDispatchToProps)(SequenceListItemContainer)
