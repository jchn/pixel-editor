import { handleActions } from 'redux-actions'
import { times } from 'ramda'
import { addModelToStore, addEntityToStore, updateEntity, removeEntityFromStore } from 'schuur'
import { getCoordsFromPixelIndex, getPixelIndex } from '../../utils'
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

const CLEAR_LAYER = Symbol('CLEAR_LAYER')
const clearLayer = layerId => {
  return {
    type: CLEAR_LAYER,
    payload: layerId
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
    dispatch(clearLayer('preview-layer'))

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

const DRAW_RECTANGLE = Symbol('DRAW_RECTANGLE')
const drawRectangle = ({ fromIndex, toIndex, color, layerId }) => {
  return {
    type: DRAW_RECTANGLE,
    payload: {
      fromIndex,
      toIndex,
      color,
      layerId
    }
  }
}

const DRAW_PREVIEW_RECTANGLE = Symbol('DRAW_PREVIEW_RECTANGLE')
const drawPreviewRectangle = ({ fromIndex, toIndex, color, layerId }) => {
  return dispatch => {
    dispatch(clearLayer('preview-layer'))

    dispatch({
      type: DRAW_RECTANGLE,
      payload: { fromIndex, toIndex, color: 'pink', layerId: 'preview-layer' }
    })
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
 drawRectangle,
 drawPreviewRectangle,
 erasePixel,
 clearLayer
}

const layerModel = {
  type: 'layer',
  typePlural: 'layers'
}

let defaultState = addModelToStore(layerModel, {})

const previewLayer = { id: 'preview-layer', name: 'preview', pixels: Array.from({ length: 16 * 16 }), width: 16, height: 16, scale: 32 }
defaultState = addEntityToStore(layerModel, previewLayer, defaultState)

defaultState = addEntityToStore(layerModel, { id: 'default-layer', name: 'Untitled layer', pixels: Array.from({ length: 16 * 16 }), width: 16, height: 16, scale: 32 }, defaultState)

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
    const newLayer = { id: uuid.v4(), name: 'Untitled layer', pixels: Array.from({ length: 16 * 16 }), width: 16, height: 16, scale: 32 }
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
  [DRAW_RECTANGLE]: (state, { payload: { fromIndex, toIndex, color, layerId } }) => {
    const layer = state.layers.byId[layerId]

    const [fromX, fromY] = getCoordsFromPixelIndex(layer.width, fromIndex)
    const [toX, toY] = getCoordsFromPixelIndex(layer.width, toIndex)

    const { pixels } = layer

    const rectangleWidth = toX - fromX
    const rectangleHeight = toY - fromY

    // Gettings all coordinatas from the rectangles clockwise, starting top left

    const coordsSideA = times(index => {
      const i = rectangleWidth < 0 ? index * -1 : index
      return [fromX + i, fromY]
    }, Math.abs(rectangleWidth))

    const coordsSideB = times(index => {
      const i = rectangleHeight < 0 ? index * -1 : index
      return [toX, fromY + i]
    }, Math.abs(rectangleHeight))

    const coordsSideC = times(index => {
      const i = rectangleWidth < 0 ? index * -1 - 1 : index + 1
      return [fromX + i, toY]
    }, Math.abs(rectangleWidth))

    const coordsSideD = times(index => {
      const i = rectangleHeight < 0 ? index * -1 - 1 : index + 1
      return [fromX, fromY + i]
    }, Math.abs(rectangleHeight))

    const rectangleCoords = [...coordsSideA, ...coordsSideB, ...coordsSideC, ...coordsSideD]

    rectangleCoords.forEach(coord => {
      const [x, y] = coord
      const pixelIndex = getPixelIndex(layer.width, layer.height, 1, x, y)
      pixels[pixelIndex] = color
    })

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
