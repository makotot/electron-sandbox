import { Dispatcher } from 'flux'
import { PlayListStore } from '../stores/PlayListStore'

const AppDispatcher = new Dispatcher()

AppDispatcher.register((payload) => {

  return true
})


export default AppDispatcher
