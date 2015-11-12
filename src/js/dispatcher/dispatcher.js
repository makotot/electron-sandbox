import { Dispatcher } from 'flux'
import { PlayListStore } from '../stores/PlayListStore'

export const AppDispatcher = new Dispatcher()

AppDispatcher.register((payload) => {
  switch (payload.eventName) {
    case 'fetch-list':
      PlayListStore.items = payload.items
      PlayListStore.emit('update')
      break
  }

  return true
})
