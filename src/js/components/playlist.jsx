import React from 'react'

export class PlayList extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      items: this.props.items
    }
  }

  render () {
    const items = this.props.items || []
    const itemList = items.map((item, index) => {
      return <li key={ index }>{ item.title }</li>
    })

    return (
      <ul>
        { itemList }
      </ul>
    )
  }
}
