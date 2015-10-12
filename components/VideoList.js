/*
 * Module dependecies
 *
 */

import React from 'react';
import VideoCard from './VideoCard';
import uid from 'uid';

export default class extends React.Component {
  render() {
    let videoNodes = this.props.videos.map((video) => {
      return <VideoCard key={uid()} thumbnailUrl={video.thumbnailUrl} id={video.id}  title={video.title} />
    });

    return (
      <section className="video__list">
        {videoNodes}
      </section>
    );
  }
}
