import axios from 'axios'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import toastr from 'toastr'

class Account extends Component {
  constructor() {
    super()
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      id: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    // OB/MS: could happen in the constructor
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
      toastr.success('Success: Your Account info has been modified.')
    } catch (err) {
      toastr.err(err)
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
              First Name<input
                onChange={this.handleChange}
                name="firstName"
                type="text"
                value={this.state.firstName}
                required
              />
            </label>
            <label className="form-row">
              Last Name<input
                onChange={this.handleChange}
                name="lastName"
                type="text"
                value={this.state.lastName}
                required
              />
            </label>
            <label className="form-row">
              Email<input
                onChange={this.handleChange}
                name="email"
                type="email"
                value={this.state.email}
                required
              />
            </label>
          </div>
          <button type="submit"> Save Changes</button>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Account)
