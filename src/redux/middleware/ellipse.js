import { UPDATE_CURRENT_PIXEL_INDEX, SET_POINTER_DOWN } from '../modules/pointer'
import { actions as storeActions } from '../modules/store'

export default store => next => action => {
  const isEllipseEnabled = store.getState().tools.selected.ellipse
  const selectedLayerId = store.getState().layers.selectedLayerId
  const currentColor = store.getState().colors.currentColor
  const isPointerDown = store.getState().pointer.isPointerDown

  const fromPixelIndex = store.getState().pointer.fromPixelIndex

  if (!isEllipseEnabled || !selectedLayerId) return next(action)

  // handle all rectangle related actions
  if (action.type === UPDATE_CURRENT_PIXEL_INDEX && isPointerDown) {
    const newAction = storeActions.drawPreviewEllipse({ fromIndex: fromPixelIndex, toIndex: action.payload })
    store.dispatch(newAction)
  }

  if (action.type === SET_POINTER_DOWN && action.payload.isPointerDown === false) {
    store.dispatch(storeActions.clearLayer('preview-layer'))

    const newAction = storeActions.drawEllipse({ fromIndex: fromPixelIndex, toIndex: action.payload.pixelIndex, color: currentColor, layerId: selectedLayerId })
    store.dispatch(newAction)
  }

  return next(action)
}
