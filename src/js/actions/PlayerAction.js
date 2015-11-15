import { AppDispatcher } from '../dispatcher/dispatcher'
import { Api } from '../api/Api'


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
  },

  next () {
    AppDispatcher.dispatch({
      eventName: 'next-player'
    })
  }
}
