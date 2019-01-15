import React, {Component} from 'react'
import {Elements} from 'react-stripe-elements'
import CheckoutForm from './CheckoutForm'

class CheckoutContainer extends Component {
  render() {
    const {placeOrder, cart, totalPrice} = this.props
    return (
      <Elements>
        <CheckoutForm
          placeOrder={placeOrder}
          cart={cart}
          totalPrice={totalPrice}
        />
      </Elements>
    )
  }
}

export default CheckoutContainer
