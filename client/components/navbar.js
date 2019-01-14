import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div className="red column">
    <h1 className="ui huge centered header">Shirt Store</h1>
    <nav>
      {isLoggedIn ? (
        <div className="ui five column doubling stackable centered grid row container">
          {/* The navbar will show these links after you log in */}
          <Link to="/home">
            <div className="ui animated fade button">
              <div className="visible content">SHOPPING</div>
              <div className="hidden content">Shopping</div>
            </div>
          </Link>
          <Link to="/purchasedOrders">
            {' '}
            <div className="ui animated fade button">
              <div className="visible content">PAST ORDERS</div>
              <div className="hidden content">Past Orders</div>
            </div>
          </Link>
          <Link to="/account">
            {' '}
            <div className="ui animated fade button">
              <div className="visible content">YOUR ACCOUNT</div>
              <div className="hidden content">Your Account</div>
            </div>
          </Link>
          <Link to="/cart">
            {' '}
            <div className="ui animated fade button">
              <div className="visible content">SHOPPING CART</div>
              <div className="hidden content">Shopping Cart</div>
            </div>
          </Link>
          <a href="#" onClick={handleClick}>
            <div className="ui animated fade button">
              <div className="visible content">LOGOUT</div>
              <div className="hidden content">Logout</div>
            </div>
          </a>
        </div>
      ) : (
        <div className="ui three column doubling stackable centered grid row container">
          {/* The navbar will show these links before you log in */}
          <Link to="/home">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
          <Link to="/search">Search</Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
