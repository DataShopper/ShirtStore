import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {AllProducts} from './index'
import {Redirect} from 'react-router-dom'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props
  if (!props.id) {
    return <AllProducts />
  }
  return (
    <div>
      <h3
        style={{paddingTop: '20px'}}
        className="ui medium centered header"
        id="title"
      >
        Welcome, {email}{' '}
      </h3>
      <AllProducts />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    id: state.user.id
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
