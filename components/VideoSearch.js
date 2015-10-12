/*
 * Module dependecies
 *
 */

 import React from 'react';

 export default class extends React.Component {
  handleQuerySubmit(e) {
    e.preventDefault();
    let query = this.refs.query.value.trim();
    if(!query) {
      return;
    }

    // todo send request to the server
    this.props.onQuerySubmit(query);
    this.refs.query.value = '';
    return;
  }

  render() {
    return (
      <form className="video__form" onSubmit={this.handleQuerySubmit.bind(this)} >
        <input type="search" placeholder="Search some videos ..."  ref="query" className="video__form__input"/>
        <input type="submit" value="Search" className="video__form__submit"/>
      </form>
    );
  }
 }

