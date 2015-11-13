import { Dispatcher } from 'flux'
import { PlayListStore } from '../stores/PlayListStore'
import { PlayerStore } from '../stores/PlayerStore'

export const AppDispatcher = new Dispatcher()

PlayListStore.dispatchToken = AppDispatcher.register((payload) => {
  switch (payload.eventName) {
    case 'update-playlist':
      PlayListStore.items = payload.items
      PlayListStore.emit('update')
      break
  }
})

AppDispatcher.register((payload) => {
  switch (payload.eventName) {
    case 'update-playlist':
      AppDispatcher.waitFor([PlayListStore.dispatchToken])
      PlayerStore.videoId = PlayListStore.items[0].videoId
      PlayerStore.emit('update')
      break

    case 'select-player':
      PlayerStore.videoId = payload.videoId
      PlayerStore.emit('update')
      break
  }
})

