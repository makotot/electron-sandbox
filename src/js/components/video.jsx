import React from 'react'

import { PlayerStore } from '../stores/PlayerStore'
import { PlayerAction } from '../actions/PlayerAction'


export class Video extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      videoId: this.props.videoId,
      autoPlay: this.props.autoPlay
    }

    this.player = null
  }

  callYoutubeApi () {
    window.onYouTubeIframeAPIReady = (function onYouTubeIframeAPIReady () {
      this.player = new YT.Player('player', {
        videoId: PlayerStore.getVideo(),
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange
        }
      });
    }).bind(this)

    window.onPlayerReady = function onPlayerReady () {
    }

    window.onPlayerStateChange = function onPlayerStateChange (event) {
      if (event.data === YT.PlayerState.ENDED) {
        PlayerAction.next()
      }
    }
  }

  componentDidMount () {
    this.callYoutubeApi()
    PlayerStore.on('update', this.updatePlayer.bind(this))
  }

  componentWillUnmount () {
    PlayListStore.off('update')
  }

  componentDidUpdate () {
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

    if (this.player) {
      this.player.loadVideoById(videoId)
    }

    const src = `https://www.youtube.com/embed/${ videoId }?autoplay=${ autoPlay }&enablejsapi=1`

    return (
      <div>
        <iframe
          id="player"
          type="ext/html"
          width="350"
          height="200"
          src={ src }
          frameBorder="0"
        >
        </iframe>
      </div>
    )
  }
}

Video.defaultProps = {
  videoId: 'M7lc1UVf-VE',
  autoPlay: 1
}
