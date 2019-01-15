import React, {Component} from 'react'
import {CardElement, injectStripe} from 'react-stripe-elements'
import toastr from 'toastr'

class CheckoutForm extends Component {
  constructor(props) {
    super(props)
    this.submit = this.submit.bind(this)
  }

  async submit(ev) {
    const {placeOrder, cart, totalPrice} = this.props
    try {
      let {token} = await this.props.stripe.createToken({name: 'Name'})
      let response = await fetch('/charge', {
        method: 'POST',
        headers: {'Content-Type': 'text/plain'},
        body: token.id
      })
      await placeOrder(cart, totalPrice)
      if (response.ok) toastr.success('Your order has been received!')
    } catch (error) {
      console.error(error)
      toastr.error('Sorry! Error processing order')
    }
  }

  render() {
    return (
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>
        <CardElement />
        <button onClick={this.submit}>Order</button>
      </div>
    )
  }
}

export default injectStripe(CheckoutForm)
