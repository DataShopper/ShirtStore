import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import axios from 'axios'
import {stringifyPrice} from '../../utils'
import CheckoutContainer from './CheckoutContainer'
import {Input, Button} from 'semantic-ui-react'

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

  /* Try-block of hydrateCartFromLocalStorage is a temporary workaround for an error thrown when parsing the localStorage element at index 0, inserted by webpack. Better: prefix localStorage keys (productIds) to signal which keys shoold be parsed.*/

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
      console.error('coold not parse json value')
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
        <br />
        <div className="ui three column doubling stackable centered padded grid row container">
          {cart.map(cartItem => (
            <div key={cartItem.productId} className="ui raised segment">
              <Link
                to={`/products/${cartItem.productId}`}
                className="ui large header"
              >
                {cartItem.name}
              </Link>
              <div>
                <img
                  className="ui centered small image"
                  src={cartItem.imageUrl}
                />
              </div>
              <p className="ui small header">{`Quantity: ${
                cartItem.quantity
              }`}</p>
              <p className="ui small header">{`Color: ${cartItem.color}`}</p>
              <p className="ui small header">{`Size: ${cartItem.size}`}</p>
              <p className="ui small header">{`Price: ${cartItem.strPrice}`}</p>
              <br />
              <Button
                onClick={() => {
                  this.removeCartItem(cartItem.productId)
                }}
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
        <br />
        <div className="ui three column doubling stackable centered container">
          <div className="ui raised segment">{`Total: ${stringifyPrice(
            this.cartTotalPrice(cart)
          )}`}</div>
          <div>
            {localStorage.length > 0 && (
              <CheckoutContainer
                placeOrder={this.placeOrder}
                cart={cart}
                totalPrice={totalPrice}
              />
            )}
          </div>
        </div>
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
