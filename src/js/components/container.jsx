'use babel';

import React from 'react';

import { Video } from './video';

export class Container extends React.Component {

  render () {
    return (
      <div>
        <p>Container</p>
        <Video />
      </div>
    )
  }
}

