import { EventEmitter } from 'events'

const STORAGE_NAME = 'history'

export const SearchHistoryStore = Object.assign({}, EventEmitter.prototype, {

  addItem (query) {
    let items = this.getItems() || []

    items.unshift(query)
    items = items.filter((item, index) => {
      return items.indexOf(item) === index
    })
    window.localStorage.setItem(STORAGE_NAME, items)
  },

  getItems () {
    let items = window.localStorage.getItem(STORAGE_NAME)

    if (!items) {
      return []
    }

    return items.split(',')
  },

  removeAll () {
    window.localStorage.removeItem(STORAGE_NAME)
  }

})
