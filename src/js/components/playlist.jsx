import React from 'react'

import { PlayerAction } from '../actions/PlayerAction'
import { PlayListAction } from '../actions/PlayListAction'
import { PlayListStore } from '../stores/PlayListStore'


export class PlayList extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      items: this.props.items
    }
  }

  componentDidMount () {
    PlayListStore
      .on('update', this.updatePlayList.bind(this))
      .on('select', this.selectPlayListItem.bind(this))
  }

  componentWillUnmount () {
    PlayListStore
      .off('change')
      .off('select')
  }

  updatePlayList () {
    this.setState({
      result: PlayListStore.getAll()
    })

    const idList = PlayListStore.getAllId()

    window.player.loadPlaylist(idList, 0)
    window.player.setLoop(true);
  }

  selectPlayListItem () {
    const idList = PlayListStore.getAllId()

    window.player.loadPlaylist(idList, PlayListStore.itemIndex)
  }

  playItem (videoId, index) {
    PlayListAction.selectItem(videoId, index)
  }

  render () {
    const items = PlayListStore.getAll() || []
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
