import React from 'react'

import FontAwesome from 'react-fontawesome'

import { PlayListStore } from '../stores/playlist-store'
import { PlayListAction } from '../actions/playlist-action'


export class Video extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      autoPlay: this.props.autoPlay
    }
  }

  callYoutubeApi () {
    window.onYouTubeIframeAPIReady = function () {
      window.player = new YT.Player('player', {
        videoId: '',
        width: 400,
        height: 250,
        events: {
          onReady: function () {
          },
          onStateChange: function (event) {
            if (event.data === YT.PlayerState.PLAYING) {
              PlayListAction.updateCurrentIndex(window.player.getPlaylistIndex())
            }
          },
          onError: function () {
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
      autoPlay: 1
    })
  }

  render () {
    const {
      autoPlay
    } = this.state

    const items = PlayListStore.getAll()
    const isVideoExist = items && items.length

    return (
      <div className={ 'video' + (isVideoExist ? '' : ' is-hidden') }>
        <div id="player"></div>
      </div>
    )
  }
}

Video.defaultProps = {
  autoPlay: 1
}
