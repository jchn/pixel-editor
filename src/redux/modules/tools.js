import { clone } from 'ramda'
import { handleActions } from 'redux-actions'

export const SELECT_TOOL = Symbol('SELECT_TOOL')

const selectTool = tool => {
  return {
    type: SELECT_TOOL,
    payload: tool
  }
}

const DEFAULT_STATE = {
  selected: {
    pen: true,
    eraser: false,
    rectangle: false,
    line: false,
    fill: false,
    ellipse: false
  }
}

export const actions = {
  selectTool
}

export default handleActions({
  [SELECT_TOOL]: (state, { payload }) => {
    const tool = payload
    const selected = clone(state.selected)

    for (const key in selected) {
      selected[key] = false
    }

    return {
      ...state,
      selected: Object.assign({}, selected, { [tool]: true })
    }
  }
}, clone(DEFAULT_STATE))
