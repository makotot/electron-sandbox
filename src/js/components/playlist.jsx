import React from 'react'

import { PlayerAction } from '../actions/player-action'
import { PlayListAction } from '../actions/playlist-action'
import { PlayListStore } from '../stores/playlist-store'
import { SearchHistoryAction } from '../actions/search-history-action'


export class PlayList extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      items: this.props.items
    }
  }

  componentDidMount () {
    PlayListStore
      .on('update', () => {
        this.updatePlayList()

        // TODO: rewrite it without using setTimeout
        setTimeout(() => {
          this.addHistory()
        }, 1)
      })
      .on('select', this.selectPlayListItem.bind(this))
  }

  componentWillUnmount () {
    PlayListStore
      .off('change')
      .off('select')
  }

  addHistory () {
    SearchHistoryAction.add(PlayListStore.getAll(), PlayListStore.getQuery())
  }

  updatePlayList () {
    const items = PlayListStore.getAll()

    this.setState({
      result: items
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
          <div className="playlist__thumb">
            <img src={ item.thumb } />
          </div>
        </li>
      )
    })

    return (
      <ul className="playlist">
        { itemList }
      </ul>
    )
  }
}
