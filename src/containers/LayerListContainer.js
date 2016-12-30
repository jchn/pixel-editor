import React, { Component } from 'react'
import { connect } from 'react-redux'
import LayerList from '../components/LayerList'
import { values } from 'ramda'
import { actions as layerActions } from '../redux/modules/layers'
import { actions as storeActions } from '../redux/modules/store'

const mapStateToProps = (state) => {
  return {
    layers: values(state.store.layers.byId),
    selectedLayerId: state.layers.selectedLayerId
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClickLayer: (id) => () => dispatch(layerActions.selectLayer(id)),
    createLayer: () => dispatch(storeActions.createLayer())
  }
}

class LayerListContainer extends Component {
  render () {
    const { layers, onClickLayer, selectedLayerId, createLayer } = this.props
    return (
      <div>
        <LayerList>
          {layers.map(l => <LayerList.Item
            key={l.id}
            selected={l.id === selectedLayerId}
            onClick={onClickLayer(l.id)}
            {...l}
            />)}
        </LayerList>
        <div style={{ position: 'fixed', bottom: 0, right: 0 }}>
          <button onClick={createLayer}>add layer</button>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LayerListContainer)
