import React from 'react'

import { PlayerStore } from '../stores/PlayerStore'
import { PlayListStore } from '../stores/PlayListStore'
import { PlayerAction } from '../actions/PlayerAction'


export class Video extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      videoId: this.props.videoId,
      autoPlay: this.props.autoPlay
    }

    //this.player = null
  }

  callYoutubeApi () {
    const videoId = PlayerStore.getVideo()

    if (!videoId) {
      return
    }

    //window.onYouTubeIframeAPIReady = (function () {
    //  console.log(this)
    //  this.player = new YT.Player('player', {
    //    videoId: videoId,
    //    events: {
    //      onReady: function () {
    //        console.log(this)
    //      },
    //      onStateChange: onPlayerStateChange
    //    }
    //  })
    //}).bind(this)

    //function onPlayerReady () {
    //  console.log(this)
    //}

    //let onPlayerStateChange = (function (event) {
    //  if (event.data === YT.PlayerState.ENDED) {
    //    let nextVideoId = PlayListStore.getNext(this.state.videoId)
    //    console.log(nextVideoId)

    //    this.player.loadVideoById(nextVideoId)
    //  }
    //}).bind(this)
  }

  componentDidMount () {
    PlayerStore.on('update', this.updatePlayer.bind(this))
  }

  componentWillUnmount () {
    PlayListStore.off('update')
  }

  componentDidUpdate (prevProps, prevState) {
    console.log(window.player)
    window.player.loadVideoById(PlayerStore.getVideo())
  }

  updatePlayer () {
    this.setState({
      videoId: PlayerStore.getVideo()
    })
  }

  render () {
    const {
      videoId,
      autoPlay
    } = this.state

    //if (this.player && videoId) {
    //  this.player.loadVideoById(videoId)
    //}
    //this.callYoutubeApi()

    const src = `https://www.youtube.com/embed/${ videoId }?autoplay=${ autoPlay }&enablejsapi=1`
    const video = videoId ? <iframe id="player" type="text/html" width="350" height="200" src={ src } frameBorder="0"></iframe> : ''

    return (
      <div>
        { video }
      </div>
    )
  }
}

Video.defaultProps = {
  videoId: '',
  autoPlay: 1
}
