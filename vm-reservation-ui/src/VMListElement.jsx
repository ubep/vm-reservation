import React from 'react'



export default class VMListElement extends React.Component {

  render() {
    return (
      <li>
        Host: {this.props.data.host}<br />
        Status: {this.props.data.status}<br />
        Description: {this.props.data.description}<br />
        Contact: {this.props.data.contact}<br />
      </li>
    )
  }

}
