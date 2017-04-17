import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './rootReducer'
import pen from './middleware/pen'
import rectangle from './middleware/rectangle'
import line from './middleware/line'
import fill from './middleware/fill'
import ellipse from './middleware/ellipse'
import sequencer from './middleware/sequencer'

export default createStore(
  rootReducer,
  applyMiddleware(thunk, pen, rectangle, line, fill, ellipse, sequencer)
)
