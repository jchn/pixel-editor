import { PLAY, actions as sequencerActions } from '../modules/sequencer'

export default store => next => action => {

  next(action)

  if (action.type === PLAY) {
    // Start playback
    let time = null
    let previousTime = 0
    let dt = 0

    const update = (newTime) => {
      const { isPlaying, currentFrameId } = store.getState().sequencer
      const frameIds = store.getState().store.present.frames.ids

      if (newTime && previousTime) {
        dt += newTime - previousTime
      }

      if (dt >= 500) {
        const nextIndex = frameIds.indexOf(currentFrameId) + 1 > frameIds.length - 1 ? 0 : frameIds.indexOf(currentFrameId) + 1
        store.dispatch(sequencerActions.setCurrentFrameId(frameIds[nextIndex]))
        dt = 0
      }

      isPlaying && window.requestAnimationFrame(update)
      previousTime = newTime
    }

    update()
  }
}
