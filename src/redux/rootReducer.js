import { combineReducers } from 'redux'
import store from './modules/store'
import layers from './modules/layers'
import colors from './modules/colors'

export default combineReducers({
  store,
  layers,
  colors
})
