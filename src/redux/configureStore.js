import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './rootReducer'
import pen from './middleware/pen'

export default createStore(
  rootReducer,
  applyMiddleware(thunk, pen)
)
