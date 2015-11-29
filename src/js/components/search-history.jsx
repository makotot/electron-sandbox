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
    this.setState({
      items: SearchHistoryStore.getItems()
    })
  }

  render () {
    const items = this.state.items || []
    const itemList = this.state.items.map((item, index) => {
      return (
        <li key={ index }>{ item.query }</li>
      )
    })

    return (
      <nav>
        { itemList }
      </nav>
    )
  }
}
