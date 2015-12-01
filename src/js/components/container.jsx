import React from 'react'

import { Video } from './video.jsx'
import { PlayList } from './playlist.jsx'
import { SearchBox } from './search-box.jsx'
import { SearchHistory } from './search-history.jsx'
import { Navigation } from './navigation.jsx'
import { Sidebar } from './sidebar.jsx'


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

