import React from 'react'
import ReactDOM from 'react-dom'

import { PlayList } from './playlist'

export class SearchBox extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      result: null,
      value: ''
    }
  }

  handleSubmit (e) {
    e.preventDefault()

    const input = ReactDOM.findDOMNode(this.refs.searchInput)
    const query = input.value
    const param = {
      part: 'snippet'
    }
    const apiKey = 'AIzaSyDxpcGtEL7bMKiyQDjBjHXTjZXuZbs2ppk'
    const url = `https://www.googleapis.com/youtube/v3/search?part=${ param.part }&order=date&q=${ query }&type=video+&videoDefinition=high&key=${ apiKey }`

    fetch(url)
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        this.setState({
          result: this.createPlayList(data)
        })
      })
      .catch((error) => {
        console.error(error)
      })
  }

  createPlayList (jsonData) {
    const jsonItems = jsonData.items

    const playList = jsonItems.map((item) => {
      return item.snippet.title
    })

    return playList
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
