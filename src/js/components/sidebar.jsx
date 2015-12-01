import React from 'react'

import FontAwesome from 'react-fontawesome'

import { SidebarStore } from '../stores/sidebar-store'
import { SidebarAction } from '../actions/sidebar-action'


export class Sidebar extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      toggleStatus: false
    }
  }

  componentDidMount () {
    SidebarStore.on('toggle', this.toggle.bind(this))
  }

  componentWillUnmount () {
    SidebarStore.off('toggle')
  }

  toggle () {
    this.setState({
      toggleStatus: !this.state.toggleStatus
    })
  }

  handleClick (e) {
    e.preventDefault()
    SidebarAction.toggle()
  }

  render () {
    const sidebarClass = `sidebar${ this.state.toggleStatus ? ' is-sidebar-opened' : '' }`

    return (
      <div className={ sidebarClass }>
        <nav>
          <ul className="sidebar__nav">
            <li className="sidebar__nav-item">
              <a href="#" className="btn btn--reversal" onClick={ this.handleClick.bind(this) }>
                <FontAwesome
                  className=''
                  size='2x'
                  name='chevron-left'
                  style={ { textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' } }
                />
              </a>
            </li>
          </ul>
        </nav>

        <div className="sidebar__main">
          { this.props.children }
        </div>
      </div>
    )
  }
}
