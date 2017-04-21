import { handleActions } from 'redux-actions'
import { clone } from 'ramda'

export const UPDATE_CURRENT_PIXEL_INDEX = Symbol('UPDATE_CURRENT_PIXEL_INDEX')
export const SET_POINTER_DOWN = Symbol('SET_POINTER_DOWN')

const updateCurrentPixelIndex = pixelIndex => {
  return {
    type: UPDATE_CURRENT_PIXEL_INDEX,
    payload: pixelIndex
  }
}

const setPointerDown = ({isPointerDown, pixelIndex}) => {
  return {
    type: SET_POINTER_DOWN,
    payload: {
      isPointerDown,
      pixelIndex
    }
  }
}

export const actions = {
  updateCurrentPixelIndex,
  setPointerDown
}

const DEFAULT_STATE = {
  isPointerDown: false,
  currentPixelIndex: null,
  fromPixelIndex: null
}

export default handleActions({
  [SET_POINTER_DOWN]: (state, { payload: { isPointerDown, pixelIndex } }) => {
    return {
      ...state,
      isPointerDown,
      fromPixelIndex: isPointerDown ? pixelIndex : null
    }
  },
  [UPDATE_CURRENT_PIXEL_INDEX]: (state, { payload }) => {
    return {
      ...state,
      currentPixelIndex: payload
    }
  }
}, clone(DEFAULT_STATE))
