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
    PlayListStore.on('update', this.updatePlayList.bind(this))
  }

  componentWillUnmount () {
    PlayListStore.off('change')
  }

  handleSubmit (e) {
    e.preventDefault()

    const input = ReactDOM.findDOMNode(this.refs.searchInput)
    const query = input.value
    const param = {
      part: 'snippet',
      order: 'date',
      type: 'video',
      videoDefinition: 'high'
    }
    const apiURL = 'https://www.googleapis.com/youtube/v3/search'
    const apiKey = 'AIzaSyDxpcGtEL7bMKiyQDjBjHXTjZXuZbs2ppk'
    const url = `${ apiURL }?part=${ param.part }&order=${ param.order }&q=${ query }&type=${ param.type }+&videoDefinition=${ param.videoDefinition }&key=${ apiKey }`

    fetch(url)
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        PlayListAction.update(this.createPlayList(data))
      })
      .catch((error) => {
        console.error(error)
      })
  }

  updatePlayList () {
    this.setState({
      result: PlayListStore.getAll()
    })
  }

  createPlayList (jsonData) {
    const jsonItems = jsonData.items

    const playList = jsonItems.map((item) => {
      return {
        videoId: item.id.videoId,
        title: item.snippet.title,
        thumb: item.snippet.thumbnails.default.url
      }
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
