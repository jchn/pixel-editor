import React from 'react'
import SequenceList from '../components/SequenceList'
import { connect } from 'react-redux'
import styled from 'styled-components'
import SequenceListItem from './SequenceListItemContainer'
import Button from '../components/Button'
import { actions as storeActions } from '../redux/modules/store'
import { actions as sequencerActions } from '../redux/modules/sequencer'
import SequencePreview from './SequencePreview'
import Icon from '../components/Icon'

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
  height: 230px;
  border-top: 1px solid #979797;
  display: flex;
  flex-direction: column;
`

const Controls = styled.div`
  background-color: #1c1a22;
  padding: 16px;
  display: flex;
`
const SequencePreviewContainer = styled.div`
  padding: 20px;
  margin-left: auto;
`

const SequencerButton = styled(Button)`
  margin-right: 16px;
`

const SequenceListContainer = ({ frames, createFrame, play, pause, isPlaying }) => (
  <Container>
    <div style={{ display: 'flex' }}>
      <SequenceList>
        {frames.map(frame => (
          <SequenceListItem key={frame.id} frame={frame}>
            {frame.id}
          </SequenceListItem>
        ))}
      </SequenceList>
      <SequencePreviewContainer>
        <SequencePreview />
      </SequencePreviewContainer>
    </div>
    <Controls>
      <SequencerButton onClick={createFrame}><Icon type='add' width={14} height={14} styled={{ display: 'block' }} /></SequencerButton>
      <SequencerButton onClick={isPlaying ? pause : play}><Icon type={isPlaying ? 'pause' : 'play'} width={isPlaying ? 12 : 11} height={14} /></SequencerButton>
    </Controls>
  </Container>
)

export default connect(mapStateToProps, mapDispatchToProps)(SequenceListContainer)
