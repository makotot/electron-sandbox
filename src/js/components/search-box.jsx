import React from 'react'
import ReactDOM from 'react-dom'

import { PlayListStore } from '../stores/PlayListStore'
import { PlayListAction } from '../actions/PlayListAction'
import { PlayerAction } from '../actions/PlayerAction'
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
    PlayListStore.on('update', this.updatePlayList.bind(this))
  }

  componentWillUnmount () {
    PlayListStore.off('change')
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
  }

  render () {
    return (
      <div>
        <form onSubmit={ this.handleSubmit.bind(this) }>
          <input type="text" ref="searchInput" placeholder="search ..." />
          <input type="button" value="search" />
        </form>
        <PlayList items={ this.state.result } />
      </div>
    )
  }
}
