import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import axios from 'axios'
import {stringifyPrice} from '../../utils'
import CheckoutContainer from './CheckoutContainer'

class Cart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cart: []
    }
    this.removeCartItem = this.removeCartItem.bind(this)
    this.placeOrder = this.placeOrder.bind(this)
    this.clearCart = this.clearCart.bind(this)
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
    console.log('total', cartTotal)
    return cartTotal
  }

  clearCart() {
    localStorage.clear()
    this.setState({cart: []})
  }

  async placeOrder(cart, totalPrice) {
    console.log('cart', cart)
    const userId = this.props.user.id
    const total = this.cartTotalPrice(cart)
    try {
      await axios.post('/api/orders', {cart, total, userId})
      this.clearCart()
    } catch (error) {
      console.error('Problem processing order')
    }
  }

  render() {
    const {cart} = this.state
    const totalPrice = this.cartTotalPrice(cart)
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
              <ul>{`Price: ${cartItem.strPrice}`}</ul>
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
        <div>{`Total: ${stringifyPrice(this.cartTotalPrice(cart))}`}</div>
        {localStorage.length > 0 && (
          <CheckoutContainer
            placeOrder={this.placeOrder}
            cart={cart}
            totalPrice={totalPrice}
          />
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Cart)
