import React from 'react'

import { Video } from './video'
import { PlayList } from './playlist'
import { SearchBox } from './search-box'
import { SearchHistory } from './search-history'


export class Container extends React.Component {

  render () {
    return (
      <div className="container">

        <div className="sidebar">
          <SearchHistory />
        </div>

        <div className="">

          <SearchBox />

          <Video />

          <div className="layout-playlist">
            <PlayList />
          </div>

        </div>

      </div>
    )
  }
}

