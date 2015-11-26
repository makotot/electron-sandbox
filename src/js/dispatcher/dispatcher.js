import { Dispatcher } from 'flux'
import { PlayListStore } from '../stores/PlayListStore'
import { PlayerStore } from '../stores/PlayerStore'


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

//    case 'update-playlist':
//      AppDispatcher.waitFor([PlayListStore.dispatchToken])
//      PlayerStore.videoId = PlayListStore.items[0].videoId
//      PlayerStore.emit('update')
//      break

  }
})

