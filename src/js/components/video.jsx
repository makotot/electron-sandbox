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
  }

  callYoutubeApi () {
    window.onYouTubeIframeAPIReady = function () {
      window.player = new YT.Player('player', {
        videoId: '',
        width: 350,
        height: 250,
        events: {
          onReady: function () {
          },
          onStateChange: function () {
          }
        }
      })
    }
  }

  componentDidMount () {
    PlayListStore.on('update', this.updatePlayer.bind(this))
    this.callYoutubeApi()
  }

  componentWillUnmount () {
    PlayListStore.off('update')
  }

  componentDidUpdate (prevProps, prevState) {
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

    const isVideoExist = PlayListStore.getAll() && PlayListStore.getAll().length

    const style = {
      display: isVideoExist ? '' : 'none'
    }

    return (
      <div id="player" style={ style }>
      </div>
    )
  }
}

Video.defaultProps = {
  videoId: '',
  autoPlay: 1
}
