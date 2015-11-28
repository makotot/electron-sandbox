import { EventEmitter } from 'events'

export const SearchHistoryStore = Object.assign({}, EventEmitter.prototype, {

  items: [],

  addItem (query) {
    this.items.push({
      query
    })
  },

  getItems () {
    return this.items
  }

})
