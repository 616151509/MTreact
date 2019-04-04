import React, { Component } from 'react'

export default class SellList extends Component {
  render() {
    let {data} = this.props;
    return (
      <ul>
        {
          data.map(item=>(
            <li key={item.mtWmPoiId}>
              <img alt="" src={item.picUrl}/ >
              <p>{item.shopName}</p>
            </li>
          ))
        }
      </ul>
    )
  }
}
