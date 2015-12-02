import React from 'react'
import ReactDOM from 'react-dom'

import FontAwesome from 'react-fontawesome'

import { SearchHistoryStore } from '../stores/search-history-store'
import { PlayListAction } from '../actions/playlist-action'
import { SidebarAction } from '../actions/sidebar-action'


export class SearchHistory extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      items: []
    }
  }

  componentDidMount () {
    SearchHistoryStore
      .on('add', this.addHistory.bind(this))
  }

  componentWillUnmount () {
    SearchHistoryStore.off('add')
  }

  addHistory () {
    let items = SearchHistoryStore.getItems()

    this.setState({
      items
    })
  }

  handleClick (e) {
    e.preventDefault()
    const targetQuery = ReactDOM.findDOMNode(e.target).innerHTML

    PlayListAction.updateList(targetQuery)
    SidebarAction.toggle()
  }

  render () {
    const items = SearchHistoryStore.getItems() || []
    const itemList = items.map((item, index) => {
      return (
        <li key={ index } className="sidebar__list-item">
          <a href="#" className="sidebar__list-item-link" onClick={ this.handleClick.bind(this) }>{ item }</a>
        </li>
      )
    })

    return (
      <nav>
        <h2 className="sidebar__headline">
          <FontAwesome
            className=''
            name='history'
          />
          <span className="sidebar__headline-inner">History</span>
        </h2>
        <ul className="sidebar__list">
          { itemList }
        </ul>
      </nav>
    )
  }
}
