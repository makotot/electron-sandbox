import React from 'react'

import { PlayerAction } from '../actions/PlayerAction'


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

  playItem (videoId) {
    console.log(videoId)
    PlayerAction.select(videoId)
  }

  render () {
    const items = this.props.items || []
    const itemList = items.map((item, index) => {
      return (
        <li
          className="playlist__item"
          key={ index }
          id={ item.videoId }
          onClick={ this.playItem.bind(this, item.videoId) }
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
