import React from 'react'

import FontAwesome from 'react-fontawesome'

import { PopularListAction } from '../actions/popularlist-action'
import { PopularListStore } from '../stores/popularlist-store'

export class PopularList extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      items: []
    }
  }

  componentDidMount () {
    PopularListAction.getItems('https://itunes.apple.com/us/rss/topsongs/limit=25/json')

    PopularListStore.on('load', this.loadItems.bind(this))
  }

  componentWillUnmount () {
    PopularListStore.off('load')
  }

  loadItems () {
    this.setState({
      items: PopularListStore.getItems()
    })
  }

  render () {
    const items = this.state.items

    const itemTemplates = items.map((item, index) => {
      return (
        <li key={ index } className="list__item">
          <div className="list__title">{ item['im:artist'].label }</div>
          <div className="list__thumb"><img src={ item['im:image'][0].label } /></div>
        </li>
      )
    })

    return (
      <div className="list">
        <h2 className="list__headline">
          <FontAwesome
            className=''
            name='fire'
          />
          <span className="list__headline-inner">Popular Songs</span>
        </h2>
        <ol className="list__items">
          { itemTemplates }
        </ol>
      </div>
    )
  }
}
