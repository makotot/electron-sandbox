import React from 'react'

import { Video } from './video'
import { PlayList } from './playlist'
import { SearchBox } from './search-box'
import { SearchHistory } from './search-history'
import { Navigation } from './navigation'
import { Sidebar } from './sidebar'


export class Container extends React.Component {

  render () {
    return (
      <div className="container">

        <Sidebar>
          <SearchHistory />
        </Sidebar>

        <div>

          <Navigation />

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

