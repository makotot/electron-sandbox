import { EventEmitter } from 'events'

export const SearchHistoryStore = Object.assign({}, EventEmitter.prototype, {

  items: [],

  addItem (items, query) {
    this.items.push({
      items,
      query
    })
  },

  getItems () {
    return this.items
  }

})
