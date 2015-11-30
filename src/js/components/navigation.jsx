import React from 'react'

import FontAwesome from 'react-fontawesome'

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
            <a href="#" className="btn" onClick={ this.handleClick.bind(this) }>
              <FontAwesome
                className='btn'
                size='2x'
                name='bars'
                style={ { textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' } }
              />
            </a>
          </li>
        </ul>
      </nav>
    )
  }
}
