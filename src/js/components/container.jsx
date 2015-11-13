import React from 'react'

import { Video } from './video'
import { PlayListBox } from './playlist-box'

export class Container extends React.Component {

  render () {
    return (
      <div>
        <PlayListBox />
        <Video
          videoId="8HkVHbJZeWY"
          autoPlay="0"
        />
      </div>
    )
  }
}

