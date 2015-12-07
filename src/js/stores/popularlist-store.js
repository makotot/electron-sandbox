import { EventEmitter } from 'events'

export const PopularListStore = Object.assign({}, EventEmitter.prototype, {

  items: [],

  setItems (items) {
    this.items = items
  },

  getItems () {
    return this.items
  }
})
