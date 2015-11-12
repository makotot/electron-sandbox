import { AppDispatcher } from '../dispatcher/dispatcher'

export const PlayListAction = {
  update (list) {
    AppDispatcher.dispatch({
      eventName: 'fetch-list',
      items: list
    })
  }
}

