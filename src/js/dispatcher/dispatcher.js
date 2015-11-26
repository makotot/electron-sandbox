import { Dispatcher } from 'flux'
import { PlayListStore } from '../stores/playlist-store'
import { SearchHistoryStore } from '../stores/search-history-store'


export const AppDispatcher = new Dispatcher()

PlayListStore.dispatchToken = AppDispatcher.register((payload) => {
  switch (payload.eventName) {
    case 'update-playlist':
      PlayListStore.items = payload.items
      PlayListStore.itemIndex = 0
      PlayListStore.query = payload.query
      PlayListStore.emit('update')
      break
  }
})

SearchHistoryStore.dispatchToken = AppDispatcher.register((payload) => {
  switch (payload.eventName) {
    case 'add-history':
        SearchHistoryStore.addItem(payload.items, payload.query)
        SearchHistoryStore.emit('add')
      break
  }
})

AppDispatcher.register((payload) => {
  switch (payload.eventName) {
    case 'select-playlist-item':
      PlayListStore.itemIndex = payload.index
      PlayListStore.emit('select')
      break
  }
})

