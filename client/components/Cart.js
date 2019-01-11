import React, {Component} from 'react'

class Cart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cart: []
    }
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

  render() {
    return (
      <div>
        {this.state.cart.map(item => <h1 key={item.id}>{item.name}</h1>)}
      </div>
    )
  }
}

export default Cart
