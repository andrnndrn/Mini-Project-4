import React, { Component } from 'react';
import DataContainer from './containers/DataContainer';


export default class App extends Component {
  render() {
    return (
      <div className='container'>
        <DataContainer />
      </div>
    );
  }
}