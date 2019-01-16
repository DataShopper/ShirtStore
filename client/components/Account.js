import axios from 'axios'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import toastr from 'toastr'
import {Input, Button} from 'semantic-ui-react'

class Account extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: this.props.user.firstName,
      lastName: this.props.user.lastName,
      email: this.props.user.email,
      id: this.props.user.id
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
      toastr.success('Success: Your Account info has been modified.')
    } catch (err) {
      toastr.error(err)
      console.error(err)
    }
  }

  render() {
    return (
      <div>
        {' '}
        <br />
        <h3
          className="ui medium centered header"
          style={{
            textAlign: 'center'
          }}
        >
          Account Profile
        </h3>
        <div
          style={{
            width: 300,
            padding: 10,
            margin: '0 auto'
          }}
        >
          <form className="ui-form" onSubmit={this.handleSubmit}>
            <div className="field">
              <label>
                <small>First Name</small>
              </label>
              <Input
                onChange={this.handleChange}
                name="firstName"
                type="text"
                value={this.state.firstName}
                required
                style={{
                  margin: -1,
                  width: '100%'
                }}
              />
            </div>
            <div className="field">
              <label>
                <small>Last Name</small>
              </label>
              <Input
                onChange={this.handleChange}
                name="lastName"
                type="text"
                value={this.state.lastName}
                required
                style={{
                  margin: -1,
                  width: '100%'
                }}
              />
            </div>

            {/* ******commented out until we are ready to implement email change
            <div className="field">
              <label>
                <small> Email</small>il
              </label>
              <Input
                onChange={this.handleChange}
                name="email"
                type="email"
                value={this.state.email}
                required
                style={{
                  margin: -1,
                  width: '100%'
                }}
              />
            </div> */}
            <div className="ui two column centered">
              <Button type="submit" className="ui two column centered">
                Save Changes
              </Button>
            </div>
          </form>
        </div>
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
