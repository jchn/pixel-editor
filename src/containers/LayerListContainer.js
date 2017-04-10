import React, { Component } from 'react'
import { connect } from 'react-redux'
import LayerList from '../components/LayerList'
import ColorPicker from './ColorPickerContainer'
import Button from '../components/Button'
import Icon from '../components/Icon'
import { actions as layerActions } from '../redux/modules/layers'
import { actions as storeActions } from '../redux/modules/store'
import { actions as toolsActions } from '../redux/modules/tools'
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc'
import renderListItem from './layerListRenderer'

const SortableLayerList = SortableContainer(LayerList)
const SortableLayerListItem = SortableElement(LayerList.Item)

console.log('SortableLayerList', SortableLayerList)

const mapStateToProps = (state) => {
  return {
    layers: state.store.layers.ids.map(id => state.store.layers.byId[id]),
    selectedLayerId: state.layers.selectedLayerId,
    selectedTool: state.tools.selected
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClickLayer: (id) => () => dispatch(layerActions.selectLayer(id)),
    createLayer: () => dispatch(storeActions.createLayer()),
    deleteLayer: (id) => dispatch(storeActions.deleteLayer(id)),
    updateLayerName: (id) => ({ name }) => dispatch(storeActions.updateLayerName(id, name)),
    updateLayerOrder: (ids) => dispatch(storeActions.updateLayerOrder(ids)),
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
    const { updateLayerOrder, layers } = this.props
    const ids = arrayMove(layers, oldIndex, newIndex).map(l => l.id)
    updateLayerOrder(ids)
  }

  render () {
    const { layers, onClickLayer, selectedLayerId, createLayer, updateLayerName, selectPenTool, selectEraser, selectRectangleTool, selectLineTool, selectedTool, selectFillTool, selectEllipseTool } = this.props
    return (
      <div>
        <SortableLayerList distance={10} onSortEnd={this.updateOrder}>
          {layers.map((layer, index) => (
            renderListItem({
              layer,
              index,
              isSelected: selectedLayerId === layer.id,
              onClick: onClickLayer(layer.id),
              onChangeName: updateLayerName(layer.id)
            })
          ))}
        </SortableLayerList>
        <div style={{ position: 'fixed', bottom: 0, right: 0 }}>
          <Button onClick={createLayer}><Icon type='add' color='white' /></Button>
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
