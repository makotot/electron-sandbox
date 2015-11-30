import React from 'react'

import { SidebarAction } from '../actions/sidebar-action'


export class Navigation extends React.Component {

  constructor (props) {
    super(props)
  }

  componentDidMount () {
  }

  handleClick (e) {
    e.preventDefault()
    SidebarAction.toggle()
  }

  render () {
    return (
      <nav>
        <ul>
          <li>
            <a href="#" className="btn" onClick={ this.handleClick.bind(this) }>&lt;&lt;</a>
          </li>
        </ul>
      </nav>
    )
  }
}
