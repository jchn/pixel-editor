import React, { Component } from 'react'
import { connect } from 'react-redux'
import LayerList from '../components/LayerList'
import ColorPicker from './ColorPickerContainer'
import Button from '../components/Button'
import Icon from '../components/Icon'
import { actions as storeActions } from '../redux/modules/store'
import { actions as toolsActions } from '../redux/modules/tools'
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc'
import LayerListItem from './LayerListItemContainer'

const SortableLayerList = SortableContainer(LayerList)
const SortableLayerListItem = SortableElement(LayerListItem)

const mapStateToProps = (state) => {
  return {
    layers: state.store.present.canvases.byId[state.store.present.frames.byId[state.sequencer.selectedFrameId].canvas].layers
      .map(id => state.store.present.layers.byId[id]),
    selectedTool: state.tools.selected,
    selectedLayerId: state.layers.selectedLayerId,
    selectedCanvasId: state.store.present.frames.byId[state.sequencer.selectedFrameId].canvas
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createLayer: canvasId => dispatch(storeActions.createLayer(canvasId)),
    deleteLayer: (id) => dispatch(storeActions.deleteLayer(id)),
    updateLayerOrder: (canvasId, ids) => dispatch(storeActions.updateLayerOrder({canvasId, ids})),
    selectPenTool: () => dispatch(toolsActions.selectTool('pen')),
    selectEraser: () => dispatch(toolsActions.selectTool('eraser')),
    selectRectangleTool: () => dispatch(toolsActions.selectTool('rectangle')),
    selectLineTool: () => dispatch(toolsActions.selectTool('line')),
    selectFillTool: () => dispatch(toolsActions.selectTool('fill')),
    selectEllipseTool: () => dispatch(toolsActions.selectTool('ellipse'))
  }
}

class LayerListContainer extends Component {
  deleteSelectedLayer = () => {
    const { selectedLayerId, deleteLayer } = this.props
    deleteLayer(selectedLayerId)
  }

  createLayer = () => {
    const { selectedCanvasId, createLayer } = this.props
    createLayer(selectedCanvasId)
  }

  onKeyup = (e) => {
    switch (e.keyCode) {
      case 8:
        this.deleteSelectedLayer()
        break
      default:
        return false
    }
  }

  componentWillMount () {
    window.document.body.addEventListener('keyup', this.onKeyup)
  }

  componentWillUnmount () {
    window.document.body.removeEventListener('keyup', this.onKeyup)
  }

  updateOrder = ({ oldIndex, newIndex }) => {
    const { updateLayerOrder, layers, selectedCanvasId } = this.props
    const ids = arrayMove(layers.filter(layer => layer.id !== 'preview-layer'), oldIndex, newIndex).map(l => l.id)
    updateLayerOrder(selectedCanvasId, ids)
  }

  render () {
    const { layers, selectPenTool, selectEraser, selectRectangleTool, selectLineTool, selectedTool, selectFillTool, selectEllipseTool } = this.props
    return (
      <div>
        <SortableLayerList distance={10} onSortEnd={this.updateOrder}>
          {layers.filter(layer => layer.id !== 'preview-layer').map((layer, index) => <SortableLayerListItem key={layer.id} index={index} layer={layer} />)}
        </SortableLayerList>
        <div style={{ position: 'fixed', bottom: 0, right: 0 }}>
          <Button onClick={this.createLayer}><Icon type='add' color='white' /></Button>
          <Button active={selectedTool.pen} onClick={selectPenTool}><Icon type='pen' color='white' /></Button>
          <Button active={selectedTool.eraser} onClick={selectEraser}>eraser</Button>
          <Button active={selectedTool.rectangle} onClick={selectRectangleTool}>rectangle</Button>
          <Button active={selectedTool.line} onClick={selectLineTool}>line</Button>
          <Button active={selectedTool.fill} onClick={selectFillTool}>fill</Button>
          <Button active={selectedTool.ellipse} onClick={selectEllipseTool}>ellipse</Button>
          <ColorPicker />
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LayerListContainer)
