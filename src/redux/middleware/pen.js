import { UPDATE_CURRENT_PIXEL_INDEX } from '../modules/pointer'
import { actions as storeActions } from '../modules/store'

export default store => next => action => {
  const isPenEnabled = store.getState().tools.selected.pen
  const selectedLayerId = store.getState().layers.selectedLayerId
  const currentColor = store.getState().colors.currentColor
  const isPointerDown = store.getState().pointer.isPointerDown

  if (!isPenEnabled || !selectedLayerId || !isPointerDown) return next(action)

  // handle all pen related actions
  if (action.type === UPDATE_CURRENT_PIXEL_INDEX) {
    const newAction = storeActions.drawPixel({ color: currentColor, layerId: selectedLayerId, index: action.payload })
    store.dispatch(newAction)
  }

  return next(action)
}
