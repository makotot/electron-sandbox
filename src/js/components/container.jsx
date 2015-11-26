import React from 'react'

import { Video } from './video'
import { PlayList } from './playlist'
import { SearchBox } from './search-box'
import { SearchHistory } from './search-history'


export class Container extends React.Component {

  render () {
    return (
      <div className="container">

        <div>
          <SearchHistory />
        </div>

        <div>

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

