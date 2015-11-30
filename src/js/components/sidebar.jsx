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
        <div>
          <a href="#" className="btn" onClick={ this.handleClick.bind(this) }>
            <FontAwesome
              className=''
              name='times'
              style={ { textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' } }
            />
          </a>
        </div>

        { this.props.children }
      </div>
    )
  }
}
