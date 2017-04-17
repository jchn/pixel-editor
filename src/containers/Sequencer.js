import React from 'react'
import SequenceList from '../components/SequenceList'
import { connect } from 'react-redux'
import styled from 'styled-components'
import SequenceListItem from './SequenceListItemContainer'
import Button from '../components/Button'
import { actions as storeActions } from '../redux/modules/store'
import { actions as sequencerActions } from '../redux/modules/sequencer'
import SequencePreview from './SequencePreview'

function mapStateToProps (state, ownProps) {
  return {
    frames: state.store.present.frames.ids.map(id => state.store.present.frames.byId[id]),
    isPlaying: state.sequencer.isPlaying
  }
}

function mapDispatchToProps (dispatch) {
  return {
    createFrame: () => dispatch(storeActions.createFrame()),
    play: () => dispatch(sequencerActions.play()),
    pause: () => dispatch(sequencerActions.pause())
  }
}

const Container = styled.div`
  height: 300px;
  position: absolute;
  left: 0;
  bottom: 0;
  border: 1px solid white;
`

const SequenceListContainer = ({ frames, createFrame, play, pause, isPlaying }) => (
  <Container>
    <SequenceList>
      {frames.map(frame => (
        <SequenceListItem key={frame.id} frame={frame}>
          {frame.id}
        </SequenceListItem>
      ))}
    </SequenceList>
    <SequencePreview />
    <Button onClick={createFrame}>new frame</Button>
    <Button onClick={play}>play</Button>
    <Button onClick={pause}>pause</Button>
  </Container>
)

export default connect(mapStateToProps, mapDispatchToProps)(SequenceListContainer)
