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
 drawPixel
}

const layerModel = {
  type: 'layer',
  typePlural: 'layers'
}

let defaultState = addModelToStore({}, layerModel)

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
    return addEntityToStore(Object.assign({}, state), layerModel, newLayer)
  },
  [DELETE_LAYER]: (state, { payload }) => {
    return removeEntityFromStore(Object.assign({}, state), layerModel, payload)
  },
  [UPDATE_LAYER_NAME]: (state, { payload }) => {
    const { id, name } = payload
    return updateEntity(Object.assign({}, state), layerModel, id, { name })
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

    return updateEntity(Object.assign({}, state), layerModel, layerId, { pixels })
  }
}, defaultState)
