import React from 'react'

import { PopularListAction } from '../actions/popularlist-action'

export class PopularList extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
    }
  }

  componentDidMount () {
    PopularListAction.getItems()
  }

  componentWillUnmount () {
  }

  render () {
    return (
      <div>
        <ul>
          <li></li>
        </ul>
      </div>
    )
  }
}
