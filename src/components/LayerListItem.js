import React from 'react'
import Canvas from './Canvas'

const LayerListItem = ({ name, pixels }) => {
  return (
    <div style={{ border: '1px solid', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem' }}>
      <span style={{ color: 'white' }}>{ name }</span>
      <Canvas pixels={pixels} scale={2} width={16} height={16} />
    </div>
  )
}

export default LayerListItem
