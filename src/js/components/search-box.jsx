import React from 'react'

export class SearchBox extends React.Component {

  constructor (props) {
    super(props)
  }

  handleSubmit (e) {
    e.preventDefault()
    console.log(this)
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
