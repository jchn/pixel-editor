import React, { Component } from 'react'
import { connect } from 'react-redux'
import LayerList from '../components/LayerList'
import { values } from 'ramda'

const mapStateToProps = (state) => {
  return {
    layers: values(state.store.layers.byId)
  }
}

class LayerListContainer extends Component {
  render () {
    const { layers } = this.props
    return (
      <LayerList>
        {layers.map(l => <LayerList.Item {...l} />)}
      </LayerList>
    )
  }
}

export default connect(mapStateToProps, null)(LayerListContainer)
