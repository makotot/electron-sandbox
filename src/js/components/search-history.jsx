import React from 'react'

import { SearchHistoryStore } from '../stores/search-history-store'


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

  render () {
    const items = SearchHistoryStore.getItems() || []
    const itemList = items.map((item, index) => {
      return (
        <li key={ index }>{ item }</li>
      )
    })

    return (
      <nav>
        <ul>
          { itemList }
        </ul>
      </nav>
    )
  }
}
