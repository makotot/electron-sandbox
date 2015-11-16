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
  }

  initYoutubeApi () {
    let player

    window.onYouTubeIframeAPIReady = function onYouTubeIframeAPIReady () {
      player = new YT.Player('player', {
        videoId: PlayerStore.getVideo(),
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange
        }
      });
    }

    window.onPlayerReady = function onPlayerReady () {
    }

    window.onPlayerStateChange = function onPlayerStateChange (event) {
      if (event.data === YT.PlayerState.ENDED) {
        PlayerAction.next()
      }
    }
  }

  componentDidMount () {
    PlayerStore.on('update', this.updatePlayer.bind(this))
    console.log(this)
    this.initYoutubeApi()
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
