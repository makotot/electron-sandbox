import { AppDispatcher } from '../dispatcher/dispatcher'


export const SearchHistoryAction = {

  add (query) {
    AppDispatcher.dispatch({
      eventName: 'add-history',
      query
    })
  }
}
