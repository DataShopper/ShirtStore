import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

class Cart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cart: []
    }
    this.removeCartItem = this.removeCartItem.bind(this)
    this.placeOrder = this.placeOrder.bind(this)
  }

  componentDidMount() {
    if (localStorage.length > 0) {
      // Not-empty cart
      this.hydrateCartFromLocalStorage()
    }
  }

  /* Try-block of hydrateCartFromLocalStorage is a temporary workaround for an error thrown when parsing the localStorage element at index 0, inserted by webpack. Better: prefix localStorage keys (productIds) to signal which keys should be parsed.*/

  hydrateCartFromLocalStorage() {
    let cart = []
    try {
      for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i)
        // Each value of a key/value localStorage pair is a stringified object representing a cart item.
        let product = JSON.parse(localStorage.getItem(key))
        cart.push(product)
      }
    } catch (error) {
      console.error('could not parse json value')
    }
    this.setState({cart})
  }

  removeCartItem(productId) {
    if (localStorage.length > 0) {
      localStorage.removeItem(productId) // Remove item from both localStorage and component state
      const cart = this.state.cart.filter(
        cartItem => productId !== cartItem.productId
      )
      this.setState({cart})
    }
  }

  cartTotalPrice(cart) {
    const cartTotal = cart.reduce((totalPrice, cartItem) => {
      return totalPrice + cartItem.quantity * cartItem.price
    }, 0)
    return cartTotal
  }

  stringifyPrice(price) {
    const needsPadding = (decimal, regex = /\.\d$/) => regex.test(decimal) // Ends in a decimal and one digit
    const addPadding = decimal =>
      needsPadding(decimal) ? decimal + '0' : decimal
    return addPadding(String(price))
  }

  async placeOrder() {
    const cart = this.state.cart
    const totalPrice = this.cartTotalPrice(this.state.cart)
    const clearCart = () => {
      localStorage.clear()
      this.setState({cart: []})
    }
    await axios.post('/api/orders', {cart, totalPrice})
    clearCart()
  }

  render() {
    const {cart} = this.state
    return (
      <div>
        {cart.map(cartItem => (
          <div key={cartItem.productId}>
            <li>
              <Link to={`/products/${cartItem.productId}`}>
                {cartItem.name}
              </Link>
              <div>
                <img src={cartItem.imageUrl} />
              </div>
              <ul>{`Quantity: ${cartItem.quantity}`}</ul>
              <ul>{`Color: ${cartItem.color}`}</ul>
              <ul>{`Size: ${cartItem.size}`}</ul>
              <ul>{`Price: ${cartItem.price}`}</ul>
            </li>
            <button
              onClick={() => {
                this.removeCartItem(cartItem.productId)
              }}
            >
              Remove
            </button>
          </div>
        ))}
        <hr />
        <div>{`Total: ${this.stringifyPrice(this.cartTotalPrice(cart))}`}</div>
        {localStorage.length > 0 && (
          <button onClick={this.placeOrder}>Order</button>
        )}
      </div>
    )
  }
}

export default Cart
