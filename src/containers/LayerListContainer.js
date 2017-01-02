import React, { Component } from 'react'
import { connect } from 'react-redux'
import LayerList from '../components/LayerList'
import ColorPicker from './ColorPickerContainer'
import { actions as layerActions } from '../redux/modules/layers'
import { actions as storeActions } from '../redux/modules/store'
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc'

const SortableLayerList = SortableContainer(LayerList)
const SortableLayerListItem = SortableElement(LayerList.Item)

console.log('SortableLayerList', SortableLayerList)

const mapStateToProps = (state) => {
  return {
    layers: state.store.layers.ids.map(id => state.store.layers.byId[id]),
    selectedLayerId: state.layers.selectedLayerId
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClickLayer: (id) => () => dispatch(layerActions.selectLayer(id)),
    createLayer: () => dispatch(storeActions.createLayer()),
    deleteLayer: (id) => dispatch(storeActions.deleteLayer(id)),
    updateLayerName: (id) => ({ name }) => dispatch(storeActions.updateLayerName(id, name)),
    updateLayerOrder: (ids) => dispatch(storeActions.updateLayerOrder(ids))
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
    const { layers, onClickLayer, selectedLayerId, createLayer, updateLayerName } = this.props
    return (
      <div>
        <SortableLayerList distance={10} onSortEnd={this.updateOrder}>
          {layers.map((l, i) => <SortableLayerListItem
            key={l.id}
            index={i}
            selected={l.id === selectedLayerId}
            onClick={onClickLayer(l.id)}
            paramName='name'
            change={updateLayerName(l.id)}
            {...l}
            />)}
        </SortableLayerList>
        <div style={{ position: 'fixed', bottom: 0, right: 0 }}>
          <button onClick={createLayer}>add layer</button>
          <ColorPicker />
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LayerListContainer)
