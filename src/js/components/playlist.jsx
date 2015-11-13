import React from 'react'

import { PlayerAction } from '../actions/PlayerAction'


export class PlayList extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      items: this.props.items
    }
  }

  playItem (videoId) {
    console.log(videoId)
    PlayerAction.select(videoId)
  }

  render () {
    const items = this.props.items || []
    const itemList = items.map((item, index) => {
      return (
        <li key={ index } id={ item.videoId } onClick={ this.playItem.bind(this, item.videoId) }>
          <div>{ item.title }</div>
          <div><img src={ item.thumb } /></div>
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
