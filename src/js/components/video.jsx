'use babel';

import React from 'react';

export class Video extends React.Component {

  state = {
    videoId: videoId,
    autoPlay: autoPlay,
  }

  static defaultProps = {
    videoId: '',
    autoPlay: 0,
  }

  render () {
    return (
      <div>
        <p>video component</p>
        <iframe
          id='player'
          type='text/html'
          width='640'
          height='390'
          src='http://www.youtube.com/embed/{ this.state.videoId }?autoplay={ this.state.autoPlay }&enablejsapi=1&origin=http://example.com'
          frameBorder='0'
        >
        </iframe>
      </div>
    )
  }
}
