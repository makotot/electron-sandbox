import React from 'react';

export class Video extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      videoId: this.props.videoId,
      autoPlay: this.props.autoPlay
    }
  }

  render () {
    const videoId = this.state.videoId;
    const autoPlay = this.state.autoPlay;
    const src = `http://www.youtube.com/embed/${ videoId }?autoplay=${ autoPlay }&enablejsapi=1&origin=http://example.com`;

    return (
      <div>
        <p>video component</p>
        <iframe
          id='player'
          type='text/html'
          width='640'
          height='390'
          src={ src }
          frameBorder='0'
        >
        </iframe>
      </div>
    )
  }
}

Video.defaultProps = {
  videoId: 'M7lc1UVf-VE',
  autoPlay: 0
}
