import { EventEmitter } from 'events'

export const PlayerStore = Object.assign({}, EventEmitter.prototype, {
  videoId: '',

  getVideo () {
    return this.videoId
  }
})
