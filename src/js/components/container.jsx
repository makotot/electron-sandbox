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

          <header className="header">
            <div className="header__column">
              <Navigation />
            </div>
            <div className="header__column">
              <SearchBox />
            </div>
          </header>

          <div className="contents">
            <div className="layout-under-header">
              <Video />
            </div>

            <PlayList />
          </div>

          <footer>
          </footer>

        </div>

      </div>
    )
  }
}

