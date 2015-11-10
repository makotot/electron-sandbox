import React from 'react'

import { SearchBox } from './search-box'

export class PlayListBox extends React.Component {

  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div>
        <SearchBox />
      </div>
    )
  }
}
