import React from 'react'

import { SearchHistoryStore } from '../stores/search-history-store'


export class SearchHistory extends React.Component {

  constructor (props) {
    super(props)
  }

  componentDidMount () {
    SearchHistoryStore
      .on('add', this.addHistory.bind(this))
  }

  addHistory () {
    console.log(SearchHistoryStore.getItems())
  }

  render () {
    return (
      <nav>
      </nav>
    )
  }
}
