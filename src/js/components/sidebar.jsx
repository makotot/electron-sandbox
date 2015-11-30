import React from 'react'

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
          <a href="#" onClick={ this.handleClick.bind(this) }>&gt;&gt;</a>
        </div>

        { this.props.children }
      </div>
    )
  }
}
