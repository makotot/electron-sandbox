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

  componentDidMount () {
    PlayerStore.on('update', this.updatePlayer.bind(this))
  }

  componentWillUnmount () {
    PlayListStore.off('update')
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

    const src = `http://www.youtube.com/embed/${ videoId }?autoplay=${ autoPlay }&enablejsapi=1`

    return (
      <div>
        <p>video component</p>
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
  autoPlay: 0
}

