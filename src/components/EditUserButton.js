import React, {Component} from 'react'
import {Button, Modal, Form, Icon} from 'semantic-ui-react'
import { editUser } from '../store/actions/users'
import { connect } from 'react-redux'
import DatePicker from 'react-datepicker';
// import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';


class EditUserButton extends Component {
  state = {
    open: false,
    id: this.props.user.id,
    displayName: this.props.user.displayName || "",
    birthDate: new Date() || "",
    bio: this.props.user.bio || "",
    userImage: this.props.user.userImage
   }

  show = (dimmer) => () => this.setState({ dimmer, open: true })

  handleSubmit = (e) => {
    const newUser = {
      id: this.state.id,
      displayName: this.state.displayName,
      bio: this.state.bio,
      birthDate: this.state.birthDate
    }
    // console.log(newUser)
    this.props.editUser(e, newUser)
    this.setState({
      open: false
     })
  }
  close = () => this.setState({ open: false })

  handleChange = (e) => {
    const name = e.target.name
    this.setState({
      [name]: e.target.value
    })
  }

  handleBirthDateChange = date => {
    this.setState({
      birthDate: date
    });
  };


  render() {
    const { open, dimmer } = this.state

    return (
      <div>
        <Button color='violet' onClick={this.show('blurring')}><Icon name='edit' size='small' />Edit User</Button>

        <Modal dimmer={dimmer} open={open} onClose={this.close}>
          <Modal.Header>Edit User!</Modal.Header>
          <Modal.Content>
            <Form
              onSubmit={(e)=>this.handleSubmit(e)}
              onChange={this.handleChange}
            >
              <Form.Input
                label="Display Name"
                type="text"
                name="displayName"
                value={this.state.displayName}
                id="display-name-field"
                required
              />
              <Form.Field>
                <label>Birth Date</label>
                  <DatePicker
                    dateFormat="yyyy-MM-dd"
                    selected={this.state.birthDate}
                    showYearDropdown
                    dropdownMode="select"
                    isClearable
                    onChange={this.handleBirthDateChange}
                    placeholderText="Click to select a date"
                  />
              </Form.Field>
              <Form.Input
                label="User Image"
                name="userImage"
                id="user-image"
                type="file"
                required
              />
              <Form.TextArea
                label="Bio"
                name="bio"
                id="bio-field"
                value={this.state.bio}
                required
              />

              <Button type="submit">Submit</Button>
            </Form>
          </Modal.Content>
        </Modal>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    editUser: (e, newUser) => dispatch(editUser(e, newUser))
  }
}

export default connect(null, mapDispatchToProps)(EditUserButton)
