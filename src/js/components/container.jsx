import React from 'react'

import { Video } from './video'
import { PlayList } from './playlist'
import { SearchBox } from './search-box'

export class Container extends React.Component {

  render () {
    return (
      <div className="container">
        <SearchBox />
        <Video
          autoPlay="0"
        />
        <div className="layout-playlist">
          <PlayList />
        </div>
      </div>
    )
  }
}

