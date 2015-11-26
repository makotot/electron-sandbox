import React from 'react'

import { Video } from './video'
import { PlayListBox } from './playlist-box'
import { SearchBox } from './search-box'

export class Container extends React.Component {

  render () {
    return (
      <div className="container">
        <SearchBox />
        <Video
          videoId=""
          autoPlay="0"
        />
      </div>
    )
  }
}

