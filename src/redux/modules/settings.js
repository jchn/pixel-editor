import { handleActions } from 'redux-actions'
import { clone } from 'ramda'

const UPDATE_SETTINGS = Symbol('UPDATE_SETTINGS')

const DEFAULT_STATE = {
  canvas: {
    width: 16,
    height: 16,
    scale: 32
  },
  palette: {
    colors: ['red', 'green', 'blue']
  }
}

export default handleActions({
  [UPDATE_SETTINGS]: (state, { payload }) => {
    return payload
  }
}, clone(DEFAULT_STATE))
