import React, { Component } from 'react'
import { connect } from 'react-redux'
import Button from '../components/Button'
import Icon from '../components/Icon'
import { actions as toolsActions } from '../redux/modules/tools'
import { actions as storeActions } from '../redux/modules/store'
import styled from 'styled-components'
import ColorPickerContainer from './ColorPickerContainer'

function mapStateToProps (state) {
  return {
    selectedTool: state.tools.selected,
    selectedCanvasId: state.store.present.frames.byId[state.sequencer.selectedFrameId].canvas
  }
}

function mapDispatchToProps (dispatch) {
  return {
    selectPenTool: () => dispatch(toolsActions.selectTool('pen')),
    selectEraser: () => dispatch(toolsActions.selectTool('eraser')),
    selectRectangleTool: () => dispatch(toolsActions.selectTool('rectangle')),
    selectLineTool: () => dispatch(toolsActions.selectTool('line')),
    selectFillTool: () => dispatch(toolsActions.selectTool('fill')),
    selectEllipseTool: () => dispatch(toolsActions.selectTool('ellipse')),
    createLayer: canvasId => dispatch(storeActions.createLayer(canvasId))
  }
}

const ToolbarButton = styled(Button)`
  margin-right: 16px;
`

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`

const Separator = styled.div`
  width: 1px;
  height: 32px;
  margin: 0 16px 0 0;
  background-color: #979797;
`

const ToolsSection = styled.div`
  display: flex;
`

const LayersSection = styled.div`
  display: flex;
  min-width: ${250 - 16}px;
`

class Toolbar extends Component {
  createLayer = () => {
    const { createLayer, selectedCanvasId } = this.props
    createLayer(selectedCanvasId)
  }

  render () {
    const {selectEllipseTool, selectPenTool, selectRectangleTool, selectFillTool, selectLineTool, selectedTool} = this.props
    return (
      <Container>
        <ToolsSection>
          <ToolbarButton active={selectedTool.ellipse} onClick={selectEllipseTool}><Icon type='ellipse' /></ToolbarButton>
          <ToolbarButton active={selectedTool.pen} onClick={selectPenTool}><Icon type='pen' /></ToolbarButton>
          <ToolbarButton active={selectedTool.rectangle} onClick={selectRectangleTool}><Icon type='rectangle' /></ToolbarButton>
          <ToolbarButton active={selectedTool.fill} onClick={selectFillTool}><Icon type='fill' /></ToolbarButton>
          <ToolbarButton active={selectedTool.line} onClick={selectLineTool}><Icon type='line' /></ToolbarButton>
          <ToolbarButton><ColorPickerContainer /></ToolbarButton>
        </ToolsSection>
        <LayersSection>
          <Separator />
          <ToolbarButton onClick={this.createLayer}><Icon type='add' width={14} height={14} /></ToolbarButton>
        </LayersSection>
      </Container>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar)
