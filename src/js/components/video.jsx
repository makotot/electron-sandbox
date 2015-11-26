import React from 'react'

import { PlayListStore } from '../stores/playlist-store'


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
        width: 350,
        height: 250,
        events: {
          onReady: function () {
          },
          onStateChange: function () {
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
  autoPlay: 1
}
