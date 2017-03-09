import { combineReducers } from 'redux'
import store from './modules/store'
import layers from './modules/layers'
import colors from './modules/colors'
import tools from './modules/tools'

export default combineReducers({
  store,
  layers,
  colors,
  tools
})
