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
        <div className="ui two column">
          <form
            className="ui-form"
            onSubmit={this.handleSubmit}
            style={{
              textAlign: 'center'
            }}
          >
            <div className="form-container">
              <label className="form-row ">
                First Name<Input
                  onChange={this.handleChange}
                  name="firstName"
                  type="text"
                  value={this.state.firstName}
                  required
                />
              </label>
              <label className="form-row">
                Last Name<Input
                  onChange={this.handleChange}
                  name="lastName"
                  type="text"
                  value={this.state.lastName}
                  required
                />
              </label>
              <label className="form-row">
                Email<Input
                  onChange={this.handleChange}
                  name="email"
                  type="email"
                  value={this.state.email}
                  required
                />
              </label>
            </div>
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
