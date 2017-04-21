import { combineReducers } from 'redux'
import store from './modules/store'
import layers from './modules/layers'
import colors from './modules/colors'
import tools from './modules/tools'
import pointer from './modules/pointer'
import settings from './modules/settings'
import sequencer from './modules/sequencer'

import undoable from './reducer-enhancers/undoable'

export default combineReducers({
  store: undoable(store, {}),
  layers,
  colors,
  tools,
  pointer,
  settings,
  sequencer
})
