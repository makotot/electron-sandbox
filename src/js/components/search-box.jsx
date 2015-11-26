import React from 'react'
import ReactDOM from 'react-dom'

import { PlayListStore } from '../stores/PlayListStore'
import { PlayListAction } from '../actions/PlayListAction'
import { PlayList } from './playlist'


export class SearchBox extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      result: null,
      value: ''
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

  handleSubmit (e) {
    e.preventDefault()

    const input = ReactDOM.findDOMNode(this.refs.searchInput)
    const query = input.value

    PlayListAction.updateList(query)
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

  render () {
    return (
      <div className="search-box">

        <form onSubmit={ this.handleSubmit.bind(this) }>
          <input type="text" className="search-box__field" ref="searchInput" placeholder="search ..." />
        </form>

        <PlayList items={ this.state.result } />

      </div>
    )
  }
}
