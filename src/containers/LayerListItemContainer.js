import React from 'react'
import LayerListItem from '../components/LayerListItem'
import { actions as layerActions } from '../redux/modules/layers'
import { actions as storeActions } from '../redux/modules/store'
import { connect } from 'react-redux'

const mapStateToProps = (state, ownProps) => {
  return {
    selected: state.layers.selectedLayerId === ownProps.layer.id,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClickToggle: () => dispatch(storeActions.toggleLayer(ownProps.layer.id)),
    onClick: () => dispatch(layerActions.selectLayer(ownProps.layer.id)),
    change: (name) => dispatch(storeActions.updateLayerName(name))
  }
}

const LayerListItemContainer = (props) => <LayerListItem {...props} />

export default connect(mapStateToProps, mapDispatchToProps)(LayerListItemContainer)
