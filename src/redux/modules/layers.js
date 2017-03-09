import { handleActions } from 'redux-actions'

const SELECT_LAYER = 'SELECT_LAYER'

const selectLayer = (id) => {
  return {
    type: SELECT_LAYER,
    payload: id
  }
}

export const actions = {
  selectLayer
}

export default handleActions({
  [SELECT_LAYER]: (state, { payload }) => {
    return {
      ...state,
      selectedLayerId: payload
    }
  }
}, { selectedLayerId: 'default-layer' })
