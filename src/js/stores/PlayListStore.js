import { EventEmitter } from 'events'

export const PlayListStore = Object.assign({}, EventEmitter.prototype, {
  items: [],

  getAll () {
    return this.items
  },

  getNext (currentId) {
    let currentIndex = this.items.indextOf(currentId)

    return this.items[currentIndex++]
  }
})
