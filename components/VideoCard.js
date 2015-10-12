/*
 * Module dependecies
 *
 */

import React from 'react';

export default class extends React.Component {
  render() {
    return (
      <article className="video__card">
        <a href={`http://www.youtube.com/watch?v=${this.props.id}`} className="video__card__thumbnail">
          <img src={this.props.thumbnailUrl} />
        </a>
        <a href={`http://www.youtube.com/watch?v=${this.props.id}`} className="video__card__title">{this.props.title}</a>
      </article>
    );
  }
}
