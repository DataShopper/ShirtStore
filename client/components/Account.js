import axios from 'axios'
import React, {Component} from 'react'
import {connect} from 'react-redux'

class Account extends Component {
  constructor() {
    super()
    this.state = {
      firstName: '',
      lastName: '',
      email: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.setState({
      firstName: this.props.user.firstName,
      lastName: this.props.user.lastName,
      email: this.props.user.email,
      id: this.props.user.id
    })
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  async handleSubmit(event) {
    event.preventDefault()
    try {
      await axios.put('/api/users/account', this.state)
    } catch (err) {
      console.error(err)
    }
  }

  render() {
    return (
      <div>
        <h3
          style={{
            textAlign: 'center'
          }}
        >
          Account Profile
        </h3>
        <form onSubmit={this.handleSubmit}>
          <div className="form-container">
            <label className="form-row">
              First Name
              <input
                onChange={this.handleChange}
                name="firstName"
                type="text"
                value={this.state.firstName}
                required
              />
            </label>
            <label className="form-row">
              Last Name
              <input
                onChange={this.handleChange}
                name="lastName"
                type="text"
                value={this.state.lastName}
                required
              />
            </label>
            <label className="form-row">
              Email
              <input
                onChange={this.handleChange}
                name="email"
                type="email"
                value={this.state.email}
                required
              />
            </label>
          </div>
          <button
            type="submit"
            style={{
              float: 'right',
              marginRight: '7px'
            }}
          >
            {' '}
            Save Changes
          </button>
        </form>
      </div>
    )
  }
}

import {submitEditedUser} from '../store/user'

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    editUser: newuseredit => dispatch(submitEditedUser(newuseredit))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Account)
