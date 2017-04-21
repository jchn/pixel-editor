import { handleActions } from 'redux-actions'

const SELECT_FRAME = Symbol('SELECT_FRAME')

const selectFrame = frameId => {
  return {
    type: SELECT_FRAME,
    payload: frameId
  }
}

export const PLAY = Symbol('PLAY')

export const play = () => {
  return {
    type: PLAY,
    payload: null
  }
}

export const PAUSE = Symbol('PAUSE')

export const pause = () => {
  return {
    type: PAUSE,
    payload: null
  }
}

const SET_CURRENT_FRAME_ID = Symbol('SET_CURRENT_FRAME_ID')

const setCurrentFrameId = frameId => {
  return {
    type: SET_CURRENT_FRAME_ID,
    payload: frameId
  }
}

export const actions = {
  selectFrame,
  play,
  pause,
  setCurrentFrameId
}

export default handleActions({
  [SELECT_FRAME]: (state, { payload }) => {
    const frameId = payload
    return {
      ...state,
      selectedFrameId: frameId
    }
  },
  [PLAY]: (state, { payload }) => {
    return {
      ...state,
      isPlaying: true
    }
  },
  [PAUSE]: (state, { payload }) => {
    return {
      ...state,
      isPlaying: false
    }
  },
  [SET_CURRENT_FRAME_ID]: (state, { payload }) => {
    const frameId = payload
    return {
      ...state,
      currentFrameId: frameId
    }
  }
}, { selectedFrameId: 'default-frame', isPlaying: false, currentFrameId: 'default-frame' })
