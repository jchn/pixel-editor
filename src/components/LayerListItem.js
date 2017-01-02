import React from 'react'
import Canvas from './Canvas'
import InlineEdit from 'react-edit-inline'

const LayerListItem = ({ name, pixels, selected, ...props }) => {
  return (
    <div style={{
      border: '1px solid',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem',
      backgroundColor: selected ? '#333333' : 'transparent'
    }} {...props}>
      <InlineEdit text={ name } {...props} style={{ color: 'white' }} />
      <Canvas pixels={pixels} scale={2} width={16} height={16} />
    </div>
  )
}

export default LayerListItem
