import { handleActions } from 'redux-actions'
import { addModelToStore, addEntityToStore, updateEntity } from 'schuur'
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

export const actions = {
 reorderLayers,
 createLayer,
 drawPixel
}

const layerModel = {
  type: 'layer',
  typePlural: 'layers'
}

let defaultState = addModelToStore({}, layerModel)

const P = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0,
  0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0,
  0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0,

  0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0,
  0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0,
  0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0,
  0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0,

  0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0,
  0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0,
  0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,

  0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
].map(v => v === 1 ? 'red': false)

const I = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,

  0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0,
  
  0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0,
  
  0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
].map(v => v === 1 ? 'red': false)

const myLayer = {
  id: '1',
  name: 'myLayer',
  pixels: P
}

const myLayer2 = {
  id: '2',
  name: 'myLayer2',
  pixels: I
}

// defaultState = addEntityToStore(defaultState, layerModel, myLayer)
defaultState = addEntityToStore(defaultState, layerModel, myLayer2)

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
  [DRAW_PIXEL]: (state, { payload }) => {
    const { layerId, color, index } = payload

    const layer = state.layers.byId[layerId]
    const { pixels } = layer

    pixels[index] = color

    return updateEntity(Object.assign({}, state), layerModel, layerId, { pixels })
  }
}, defaultState)
