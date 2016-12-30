import { combineReducers } from 'redux'
import store from './modules/store'
import layers from './modules/layers'

export default combineReducers({
  store,
  layers
})
