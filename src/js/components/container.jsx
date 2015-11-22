import React from 'react'

import { Video } from './video'
import { PlayListBox } from './playlist-box'

export class Container extends React.Component {

  render () {
    return (
      <div className="container">
        <PlayListBox />
        <Video
          videoId=""
          autoPlay="0"
        />
      </div>
    )
  }
}

