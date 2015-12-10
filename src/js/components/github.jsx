import React from 'react'

import FontAwesome from 'react-fontawesome'


export class Github extends React.Component {

  constructor (props) {
    super(props)
  }

  render () {
    return (
      <a href="https://github.com/makotot/electron-sandbox" className="footer__link">
        <FontAwesome
          className='github'
          size='2x'
          name='github'
        />
      </a>
    )
  }
}
