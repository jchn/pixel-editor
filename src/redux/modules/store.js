import { handleActions } from 'redux-actions'
import { addModelToStore, addEntityToStore } from 'schuur'

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

export const actions = {
 reorderLayers,
 createLayer
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

const myLayer = {
  name: 'myLayer',
  pixels: P
}

defaultState = addEntityToStore(defaultState, layerModel, myLayer)

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
    const newLayer = { name: 'Untitled layer', pixels: Array.from({ length: 16 * 16 }) }
    return addEntityToStore(state, layerModel, newLayer)
  }
}, defaultState)
