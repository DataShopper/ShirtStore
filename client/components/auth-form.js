import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props
  let newProfile = false
  if (name === 'signup') {
    newProfile = true
  }

  return (
    <div>
      <form onSubmit={handleSubmit} name={name}>
        <div>
          <label htmlFor="email">
            <small>Email</small>
          </label>
          <input name="email" id="email" type="text" />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" id="password" type="password" />
        </div>
        {newProfile && (
          <div>
            <div>
              <label htmlFor="firstName">
                <small>First Name</small>
              </label>
              <input name="firstName" id="firstName" type="text" />
            </div>
            <div>
              <label htmlFor="lastName">
                <small>Last Name</small>
              </label>
              <input name="lastName" id="lastName" type="text" />
            </div>
            <div>
              <label htmlFor="address">
                <small>Address Line 1</small>
              </label>
              <input name="address" id="address" type="text" />
            </div>
          </div>
        )}
        <div>
          <button type="submit" id="loginbtn">
            {displayName}
          </button>
        </div>
        {error &&
          error.response && (
            <div id="errorMessage"> {error.response.data} </div>
          )}
      </form>
      <a href="/auth/google">{displayName} with Google</a>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      let user
      if (formName === 'login') {
        user = {email, password}
        dispatch(auth(formName, user))
      } else {
        let address, firstName, lastName
        if (evt.target.firstName.value) {
          firstName = evt.target.firstName.value
        }
        if (evt.target.lastName.value) {
          lastName = evt.target.lastName.value
        }
        if (evt.target.address.value) {
          address = evt.target.address.value
        }
        const newUser = {
          email,
          password,
          firstName,
          lastName,
          address
        }
        user = newUser
        dispatch(auth(formName, user))
      }
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
