import React from 'react'

import { PlayerAction } from '../actions/PlayerAction'
import { PlayListAction } from '../actions/PlayListAction'


export class PlayList extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      items: this.props.items
    }
  }

  componentDidMount () {
  }

  componentWillUnmount () {
  }

  playItem (videoId, index) {
    //PlayerAction.select(videoId)
    PlayListAction.selectItem(videoId, index)
  }

  render () {
    const items = this.props.items || []
    const itemList = items.map((item, index) => {
      return (
        <li
          className="playlist__item"
          key={ index }
          id={ item.videoId }
          onClick={ this.playItem.bind(this, item.videoId, index) }
        >
          <div className="playlist__title">{ item.title }</div>
          <div className="playlist__thumb"><img src={ item.thumb } /></div>
        </li>
      )
    })

    return (
      <ul>
        { itemList }
      </ul>
    )
  }
}
