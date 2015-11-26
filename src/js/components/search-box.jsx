import React from 'react'
import ReactDOM from 'react-dom'

import { PlayListStore } from '../stores/playlist-store'
import { PlayListAction } from '../actions/playlist-action'


export class SearchBox extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      result: null,
      value: ''
    }
  }

  componentDidMount () {
  }

  componentWillUnmount () {
  }

  handleSubmit (e) {
    e.preventDefault()

    const input = ReactDOM.findDOMNode(this.refs.searchInput)
    const query = input.value

    PlayListAction.updateList(query)
  }

  render () {
    return (
      <div className="search-box">

        <form onSubmit={ this.handleSubmit.bind(this) }>
          <input type="text" className="search-box__field" ref="searchInput" placeholder="search ..." />
        </form>

      </div>
    )
  }
}
