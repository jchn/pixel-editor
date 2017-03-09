import React from 'react'
import LayerListItem from '../components/LayerListItem'
import { SortableElement } from 'react-sortable-hoc'

const SortableLayerListItem = SortableElement(LayerListItem)

const renderLayerListItem = ({ layer, index, isSelected, onClick, onChangeName }) => {
  return layer.id === 'preview-layer'
    ? null
    : <SortableLayerListItem
    key={layer.id}
    index={index}
    selected={isSelected}
    onClick={onClick}
    paramName='name'
    change={onChangeName}
    layer={layer}
  />
}

export default renderLayerListItem
