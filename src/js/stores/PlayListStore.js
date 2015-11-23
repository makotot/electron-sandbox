import { EventEmitter } from 'events'

export const PlayListStore = Object.assign({}, EventEmitter.prototype, {
  items: [],

  getAll () {
    return this.items
  }

})
