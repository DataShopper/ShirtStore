import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'
import {me} from './store'
import {
  SingleProduct,
  Login,
  Signup,
  UserHome,
  Cart,
  AllProducts,
  Account,
  PurchasedOrders,
  Search
} from './components'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props
    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route exact path="/home" component={UserHome} />
        <Route path="/products/:productId" component={SingleProduct} />
        <Route path="/search" component={Search} />

        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route exact path="/" component={UserHome} />
            <Route exact path="/home" component={UserHome} />
            <Route path="/purchasedOrders" component={PurchasedOrders} />
            <Route exact path="/products" component={AllProducts} />
            <Route path="/search" component={Search} />
            <Route path="/products/:productId" component={SingleProduct} />
            <Route path="/account" component={Account} />
            <Route path="/cart" component={Cart} />
            <Route path="/api" component={UserHome} />
          </Switch>
        )}
        {/* Displays our Product component as a fallback */}
        <Route component={AllProducts} />
        {/* <Redirect to='/guestHome' /> */}
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
