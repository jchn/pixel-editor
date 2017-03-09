import { handleActions } from 'redux-actions'

const UPDATE_COLOR = 'UPDATE_COLOR'

const updateColor = (color) => {
  return {
    type: UPDATE_COLOR,
    payload: color
  }
}

export const actions = {
  updateColor
}

export default handleActions({
  [UPDATE_COLOR]: (state, { payload }) => {
    return {
      ...state,
      currentColor: payload
    }
  }
}, { currentColor: '#000000' })
