import React, { Component } from 'react'
import './selector.scss'

export default class Selector extends Component {
  render() {
    return (
      <div className="seller-selector" ref="dom">
        test
      </div>
    )
  }
  getOffsetTop=()=>{
    return this.refs.dom && this.refs.dom.offsetTop;
  }
}
