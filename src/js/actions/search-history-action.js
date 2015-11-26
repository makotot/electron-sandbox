import { AppDispatcher } from '../dispatcher/dispatcher'


export const SearchHistoryAction = {

  add (items, query) {
    AppDispatcher.dispatch({
      eventName: 'add-history',
      items,
      query
    })
  }
}
