import React from 'react'

import { Video } from './video'
import { SearchBox } from './search-box'

export class Container extends React.Component {

  render () {
    return (
      <div>
        <p>Container</p>
        <SearchBox />
        <Video
          videoId="8HkVHbJZeWY"
          autoPlay="0"
        />
      </div>
    )
  }
}

