import React from 'react'
import $ from 'jquery'

import VMListElement from './VMListElement.jsx'



export default class VMList extends React.Component {

  constructor(props) {
    super(props);
    this.loadVmList = this.loadVmList.bind(this)
    this.state = {
      vms: [],
    }
  }

  componentDidMount() {
    this.loadVmList()
  }

  render() {
    let data = this.state.vms
    let vms = []
    for(let i=0; i<data.length; ++i) {
      vms.push(
        <VMListElement key={data[i].id} data={data[i]} />
      )
    }

    return (
      <ul>
        {vms}
      </ul>
    )
  }



  loadVmList() {
    $.ajax({
      url: 'http://teamred-jenkins.vm-intern.epages.com:3000/vms',
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({vms: data.vms})
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString())
      }.bind(this)
    })
  }

}
