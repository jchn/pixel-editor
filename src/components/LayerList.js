import React from 'react'
import LayerListItem from './LayerListItem'

const LayerList = ({ children }) => (
  <div style={{ border: '1px solid', backgroundColor: '#282828', width: '200px', position: 'fixed', top: 0, right: 0, height: '100%' }}>
    {children}
  </div>
)

LayerList.Item = LayerListItem

export default LayerList
