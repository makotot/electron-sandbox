import React from 'react'

import { SidebarStore } from '../stores/sidebar-store'


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

  render () {
    const sidebarClass = `sidebar${ this.state.toggleStatus ? ' is-sidebar-opened' : '' }`
    console.log(sidebarClass)

    return (
      <div className={ sidebarClass }>
        { this.props.children }
      </div>
    )
  }
}
