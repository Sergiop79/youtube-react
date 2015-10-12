/*
 * Module dependecies
 *
 */

import React from 'react';
import request from 'superagent';
import VideoSearch from './VideoSearch';
import VideoList from './VideoList';

import config from '../config';

const apiKey = config.apiKey;

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {videos:[]};
  }

  fetchData(query, nextPageToken) {
    let apiUrl = 'https://www.googleapis.com/youtube/v3/search';
    this.state.query = query;

    let queryObj = {
      part: 'snippet',
      maxResults: '15',
      type: 'video',
      q: query,
      key: apiKey
    };

    if (nextPageToken) {
      queryObj.pageToken = nextPageToken;
    }

    request
      .get(apiUrl)
      .query(queryObj)
      .end((err, res) => {
        if (err) {
          console.log(err);
        } else {
          this.state.nextPageToken = res.body.nextPageToken;

          let items = res.body.items;
          if(res.body.items.length) {
            items.map((item) => {
              let video = {
                id: item.id.videoId,
                title: item.snippet.title,
                thumbnailUrl: item.snippet.thumbnails.medium.url
              }
              this.state.videos.push(video);
            });
          } else {
            // todo display better not found

            alert('not -found');
            console.log('not -found');
            return;
          }

         this.setState({videos: this.state.videos, nextPageToken: this.state.nextPageToken, query: this.state.query});       
        }
      });
  }


  handleQuery(query) {
    this.setState({videos: []});
    this.fetchData(query);
  }

  handleScroll() {
    let nextPageToken = this.state.nextPageToken;
    console.log(nextPageToken);
    this.fetchData(this.state.query, nextPageToken);
  }

  

  componentDidMount() {
    window.onscroll = function(ev) {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        // you're at the bottom of the page
        console.log('you are at the bottom');
        let query = this.state.query;
        let nextPageToken = this.state.nextPageToken;
        let isNewQuery = false;
        this.handleScroll(query, nextPageToken);
      }
    }.bind(this);
  }

  render() {
    return (
      <div className="video__app">
        <VideoSearch className="video__app__container" onQuerySubmit={this.handleQuery.bind(this)} />
        <VideoList videos={this.state.videos}  className="video__app__list" id="video-list" />
      </div>
    );
  }
}


