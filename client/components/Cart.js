import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class Cart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cart: []
    }
    this.removeCartItem = this.removeCartItem.bind(this)
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
    const needsPadding = (numString, regex = /\.\d$/) => regex.test(numString) // Ends in a decimal and one digit
    const addPadding = numString =>
      needsPadding(numString) ? numString + '0' : numString

    const cartTotal = cart.reduce((totalPrice, cartItem) => {
      return totalPrice + cartItem.quantity * cartItem.price
    }, 0)
    /*  Decimals ending in zeros are truncated to the first nonzero number after the decimal place.
    This would look funny in prices. */
    const stringTotal = addPadding(String(cartTotal))
    return stringTotal
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
        <div>{`Total: ${this.cartTotalPrice(cart)}`}</div>
      </div>
    )
  }
}

export default Cart
