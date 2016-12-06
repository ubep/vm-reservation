import React from 'react'
import $ from 'jquery'



export default class VMListElement extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      editable: false
    }

    this.setToEditable = this.setToEditable.bind(this)
    this.updateAttributes = this.updateAttributes.bind(this)

    this.getAttributesList = this.getAttributesList.bind(this)
    this.getAttributesListEditor = this.getAttributesListEditor.bind(this)
    this.getStatusEditForm = this.getStatusEditForm.bind(this)
    this.getDescriptionEditForm = this.getDescriptionEditForm.bind(this)
  }



  render() {

    let attributes
    if(this.state.editable) {
      attributes = this.getAttributesListEditor()
    } else {
      attributes = this.getAttributesList()
    }

    return (
      <li>
        Host: {this.props.data.host}<br />
        {attributes}
      </li>
    )
  }



  getAttributesList() {
   return (
      <ul onClick={() => this.setToEditable(true)}>
        <li>Status: {this.props.data.status}</li>
        <li>Description: {this.props.data.description}</li>
        <li>Contact: {this.props.data.contact}</li>
      </ul>
    )
  }



  getAttributesListEditor() {
   return (
      <div>
        <ul>
          <li>Status: {this.getStatusEditForm()}</li>
          <li>Description: {this.getDescriptionEditForm()}</li>
          <li>Contact: {this.getContactEditForm()}</li>
        </ul>
        <button ref="attributesInputOK" onClick={() => this.updateAttributes()}>OK</button>
        <button ref="attributesInputX" onClick={() => this.setToEditable(false)}>X</button>
      </div>
    )
  }



  getStatusEditForm() {
    let currentStatus = this.props.data.status
    let optionFree = currentStatus == "free" ? <option value="free" selected="true">free</option> : <option value="free">free</option>
    let optionInUse = currentStatus == "in use" ? <option value="in use" selected="true">in use</option> : <option value="in use">in use</option>
    let optionOutOfOrder = currentStatus == "out of order" ? <option value="out of order" selected="true">out of order</option> : <option value="out of order">out of order</option>

    return (
      <select ref="attributesFormStatus">
        {optionFree}
        {optionInUse}
        {optionOutOfOrder}
      </select>
    )
  }



  getDescriptionEditForm() {
    return (
      <textarea ref="attributesFormDescription" defaultValue={this.props.data.description}>
      </textarea>
    )
  }



  getContactEditForm() {
    return (
      <input type="text" ref="attributesFormContact" defaultValue={this.props.data.contact} />
    )
  }



  setToEditable(editable) {
    this.setState({editable: editable})
  }



  updateAttributes() {
    let data = {
      id: this.props.data.id,
      host: this.props.data.host,
      systeminfo: this.props.data.systeminfo,
      bookingtime: this.props.data.bookingtime,
      status: this.refs.attributesFormStatus.value,
      description: this.refs.attributesFormDescription.value,
      contact: this.refs.attributesFormContact.value
    }
    console.log(data)

    /*
    $.put({
      url: 'http://teamred-jenkins.vm-intern.epages.com:3000/vms/'+data.id,
      data: data,
      contentType: 'application/json',
      success: () => {
        console.log('VM attributes updated!')
        this.setToEditable(false)
      }
    })
    */
    
  }

}

