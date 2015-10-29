import React from 'react'
import fetch from 'fetch-jsonp'

export class SearchBox extends React.Component {

  constructor (props) {
    super(props)
  }

  handleSubmit (e) {
    e.preventDefault()
  }

  render () {

    return (
      <form onSubmit={ this.handleSubmit }>
        <input type="text" placeholder="search ..." />
        <input type="button" value="search" />
      </form>
    )
  }
}
