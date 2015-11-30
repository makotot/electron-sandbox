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

  addHistory () {
    let items = SearchHistoryStore.getItems()

    items = items.filter((item, index) => {
      return items.indexOf(item) === index
    })
    console.log(items)

    this.setState({
      items
    })
  }

  render () {
    const items = this.state.items || []
    const itemList = this.state.items.map((item, index) => {
      return (
        <li key={ index }>{ item }</li>
      )
    })

    return (
      <nav>
        { itemList }
      </nav>
    )
  }
}
