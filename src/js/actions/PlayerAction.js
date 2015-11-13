import { AppDispatcher } from '../dispatcher/dispatcher'
import { Api } from '../api/Api'


let player

window.onYouTubeIframeAPIReady = function onYouTubeIframeAPIReady () {
  player = new YT.Player('player', {
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

window.onPlayerReady = function onPlayerReady () {
  console.log(this)
}

window.onPlayerStateChange = function onPlayerStateChange (event) {
  console.log(event.data)
  if (event.data === YT.PlayerState.ENDED) {
    console.log(YT.PlayerState.ENDED)
    PlayerAction.next()
  }
}


export const PlayerAction = {
  update (videoId = '') {
    AppDispatcher.dispatch({
      eventName: 'update-player',
      videoId
    })
  },

  select (videoId = '') {
    AppDispatcher.dispatch({
      eventName: 'select-player',
      videoId
    })
  },

  next () {
    console.log(this)
    AppDispatcher.dispatch({
      eventName: 'next-player'
    })
  }
}
