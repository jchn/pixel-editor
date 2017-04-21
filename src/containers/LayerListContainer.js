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
    updateLayerOrder: (canvasId, ids) => dispatch(storeActions.updateLayerOrder({canvasId, ids}))
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
    const { layers } = this.props
    return (
      <div>
        <SortableLayerList distance={10} onSortEnd={this.updateOrder}>
          {layers.filter(layer => layer.id !== 'preview-layer').map((layer, index) => <SortableLayerListItem key={layer.id} index={index} layer={layer} />)}
        </SortableLayerList>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LayerListContainer)
