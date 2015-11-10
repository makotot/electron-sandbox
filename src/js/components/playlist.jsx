import React from 'react'

export class PlayList extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      items: this.props.items
    }
  }

  componentWillReceiveProps () {
    console.log(this)
    this.setState({
      items: this.props.items
    })
  }

  render () {
    console.log(this.state)
    return (
      <div></div>
    )
  }
}
