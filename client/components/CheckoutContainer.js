import React, {Component} from 'react'
import {Elements} from 'react-stripe-elements'
import CheckoutForm from './CheckoutForm'

class CheckoutContainer extends Component {
  render() {
    console.log('lalalakkkkk')

    return (
      <Elements>
        <CheckoutForm />
      </Elements>
    )
  }
}

export default CheckoutContainer
