import { handleActions } from 'redux-actions'
import { addModelToStore, addEntityToStore, updateEntity, removeEntityFromStore } from 'schuur'
import uuid from 'uuid'

const REORDER_LAYERS = 'REORDER_LAYERS'

const reorderLayers = (ids) => {
  return {
    type: REORDER_LAYERS,
    payload: ids
  }
}

const CREATE_LAYER = 'CREATE_LAYER'
const CLEAR_LAYER = Symbol('CLEAR_LAYER')

const createLayer = () => {
  return {
    type: CREATE_LAYER,
    payload: null
  }
}

const DELETE_LAYER = 'DELETE_LAYER'

const deleteLayer = (id) => {
  return {
    type: DELETE_LAYER,
    payload: id
  }
}

const UPDATE_LAYER_ORDER = 'UPDATE_LAYER_ORDER'

const updateLayerOrder = (ids) => {
  return {
    type: UPDATE_LAYER_ORDER,
    payload: ids
  }
}

const DRAW_PIXEL = 'DRAW_PIXEL'
const drawPixel = ({ color, layerId, index }) => {
  return {
    type: DRAW_PIXEL,
    payload: {
      color,
      index,
      layerId
    }
  }
}

const ERASE_PIXEL = Symbol('ERASE_PIXEL')
const erasePixel = ({ layerId, index }) => {
  return {
    type: ERASE_PIXEL,
    payload: {
      index,
      layerId
    }
  }
}

const drawPreviewPixel = ({ index }) => {
  return dispatch => {
    // First clear the layer
    dispatch({
      type: CLEAR_LAYER,
      payload: 'preview-layer'
    })

    // Then draw the new preview
    dispatch({
      type: DRAW_PIXEL,
      payload: { layerId: 'preview-layer', color: 'pink', index }
    })
  }
}

const UPDATE_LAYER_NAME = 'UPDATE_LAYER_NAME'
const updateLayerName = (id, name) => {
  return {
    type: UPDATE_LAYER_NAME,
    payload: {
      id,
      name
    }
  }
}

export const actions = {
 reorderLayers,
 createLayer,
 deleteLayer,
 updateLayerName,
 updateLayerOrder,
 drawPixel,
 drawPreviewPixel,
 erasePixel
}

const layerModel = {
  type: 'layer',
  typePlural: 'layers'
}

let defaultState = addModelToStore(layerModel, {})

const previewLayer = { id: 'preview-layer', name: 'preview', pixels: Array.from({ length: 16 * 16 }) }
defaultState = addEntityToStore(layerModel, previewLayer, defaultState)

defaultState = addEntityToStore(layerModel, { id: 'default-layer', name: 'Untitled layer', pixels: Array.from({ length: 16 * 16 }) }, defaultState)

export default handleActions({
  [REORDER_LAYERS]: (state, { payload }) => {
    return {
      layers: {
        byId: state.layers.byId,
        ids: payload
      }
    }
  },
  [CREATE_LAYER]: (state, { payload }) => {
    const newLayer = { id: uuid.v4(), name: 'Untitled layer', pixels: Array.from({ length: 16 * 16 }) }
    return addEntityToStore(layerModel, newLayer, Object.assign({}, state))
  },
  [DELETE_LAYER]: (state, { payload }) => {
    return removeEntityFromStore(layerModel, payload, Object.assign({}, state))
  },
  [UPDATE_LAYER_NAME]: (state, { payload }) => {
    const { id, name } = payload
    return updateEntity(layerModel, id, { name }, Object.assign({}, state))
  },
  [UPDATE_LAYER_ORDER]: (state, { payload }) => {
    const nextState = Object.assign({}, state)
    nextState.layers.ids = payload
    return nextState
  },
  [DRAW_PIXEL]: (state, { payload }) => {
    const { layerId, color, index } = payload

    const layer = state.layers.byId[layerId]
    const { pixels } = layer

    pixels[index] = color

    return updateEntity(layerModel, layerId, { pixels }, Object.assign({}, state))
  },
  [CLEAR_LAYER]: (state, { payload }) => {
    const layerId = payload

    return updateEntity(layerModel, layerId, { pixels: Array.from({ length: 16 * 16 }) }, Object.assign({}, state))
  },
  [ERASE_PIXEL]: (state, { payload }) => {
    const { layerId, index } = payload

    const layer = state.layers.byId[layerId]
    const { pixels } = layer

    pixels[index] = null

    return updateEntity(layerModel, layerId, { pixels }, Object.assign({}, state))
  }
}, defaultState)
