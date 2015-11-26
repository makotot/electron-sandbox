import { Dispatcher } from 'flux'
import { PlayListStore } from '../stores/playlist-store'


export const AppDispatcher = new Dispatcher()

PlayListStore.dispatchToken = AppDispatcher.register((payload) => {
  switch (payload.eventName) {
    case 'update-playlist':
      PlayListStore.items = payload.items
      PlayListStore.itemIndex = 0
      PlayListStore.emit('update')
      break
  }
})

AppDispatcher.register((payload) => {
  switch (payload.eventName) {
    case 'select-playlist-item':
      PlayListStore.itemIndex = payload.index
      PlayListStore.emit('select')

  }
})

