import { AppDispatcher } from '../dispatcher/dispatcher'


export const PlayerAction = {
  update (videoId = '') {
    AppDispatcher.dispatch({
      eventName: 'update-player',
      videoId
    })
  },

  select (videoId = '') {
    AppDispatcher.dispatch({
      eventName: 'select-player',
      videoId
    })
  }
}
