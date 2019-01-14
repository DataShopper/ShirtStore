import React, {Component} from 'react'
import axios from 'axios'
import {Input, Button} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import toastr from 'toastr'
import {connect} from 'react-redux'
import {removeProduct, oneItem} from '../store'
import {Link} from 'react-router-dom'
import {UpdateProduct} from './index'

class SingleProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      sizeChosen: '',
      colorChosen: '',
      categoryChosen: ''
    }
    this.handleSelect = this.handleSelect.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async componentDidMount() {
    const id = this.props.match.params.productId
    await this.props.oneProduct(id)
    this.setState({loading: false})
  }

  async handleSelect(evt) {
    await this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleSubmit(evt) {
    evt.preventDefault()
    const quantity = Number(this.state.quantity)
    const totalPrice = quantity * this.props.singleItem.price
    try {
      let item = {
        name: this.props.singleItem.name,
        productId: this.props.singleItem.id,
        size: this.state.sizeChosen,
        price: this.props.singleItem.price,
        color: this.state.colorChosen,
        category: this.state.categoryChosen,
        quantity, // This is a string because it originates in the DOM, when the user chooses a quantity. Convert because it is used for computing prices.
        totalPrice,
        style: this.props.singleItem.style,
        imageUrl: this.props.singleItem.imageUrl
      }
      localStorage.setItem(this.props.singleItem.id, JSON.stringify(item))
      toastr.success('Success: Your shopping cart has been updated.')
    } catch (err) {
      toastr.err(err)
      console.error(err)
    }
  }

  render() {
    const admin = this.props.user.admin
    const product = this.props.singleItem || {}
    const size = product.sizes || []
    const color = product.color || []
    const category = product.category || []
    const removed = this.props.removed
    const objects = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
    if (this.state.loading) {
      return <div />
    }

    return (
      <div className="ui raised very padded centered text container segment">
        <p className="ui large centered header">{product.name}</p>
        <p className="ui small centered header">{product.price}</p>
        <img src={product.imageUrl} />
        <p className="ui small centered header">{product.description}</p>
        <Input list="size" placeholder="SIZE" />
        <datalist id="size">
          <div>
            {admin && <UpdateProduct />}
            <p>{product.name}</p>
            <p>${product.price}</p>
            <img src={product.imageUrl} />
            <p>{product.description}</p>
            <select name="sizeChosen" onChange={this.handleSelect} required>
              <option>--</option>
              {size.map((size, idx) => {
                return (
                  <option key={idx} name="sizeChosen">
                    {size}
                  </option>
                )
              })}
            </select>
          </div>
        </datalist>
        <i className="large chess rook icon" />
        <Input list="category" placeholder="CATEGORY" />
        <datalist
          id="category"
          aria-required="true"
          name="categoryChosen"
          onChange={this.handleSelect}
        >
          <select>
            {category.map((category, idx) => {
              return <option key={idx}>{category}</option>
            })}
          </select>
        </datalist>
        <Input list="color" placeholder="COLOR" />
        <datalist
          id="color"
          name="colorChosen"
          onChange={this.handleSelect}
          aria-required="true"
        >
          <option>color</option>
          <select name="categoryChosen" onChange={this.handleSelect} required>
            <option>--</option>
            {category.map((category, idx) => {
              return <option key={idx}>{category}</option>
            })}
          </select>
          <select name="colorChosen" onChange={this.handleSelect} required>
            <option>--</option>
            {color.map((color, idx) => {
              return (
                <option key={idx} onChange={this.handleSelect} required>
                  {color}
                </option>
              )
            })}
          </select>
        </datalist>
        <Input list="quantity" placeholder="QUANTITY" />
        <datalist
          id="quantity"
          name="qty"
          onChange={this.handleSelect}
          aria-required="true"
        >
          <option>quantity</option>
          <select name="qty" onChange={this.handleSelect} required>
            <option />
            {objects.map((object, idx) => {
              return <option key={idx}>{object}</option>
            })}
          </select>
        </datalist>
        <p>{product.description}</p>
        <select name="sizeChosen" onChange={this.handleSelect} required>
          <option>--</option>
          {size.map((size, idx) => {
            return (
              <option key={idx} name="sizeChosen">
                {size}
              </option>
            )
          })}
        </select>
        <select name="categoryChosen" onChange={this.handleSelect} required>
          <option>--</option>
          {category.map((category, idx) => {
            return <option key={idx}>{category}</option>
          })}
        </select>
        <select name="colorChosen" onChange={this.handleSelect} required>
          <option>--</option>
          {color.map((color, idx) => {
            return (
              <option key={idx} onChange={this.handleSelect} required>
                {color}
              </option>
            )
          })}
        </select>
        <select name="quantity" onChange={this.handleSelect} required>
          <option />
          {objects.map((object, idx) => {
            return <option key={idx}>{object}</option>
          })}
        </select>
        <div>
          <Button type="submit" onClick={this.handleSubmit}>
            ADD TO CART
          </Button>
          <Button type="button">VIEW CART</Button>
          <Button type="button">CONTINUE SHOPPING</Button>
        </div>
        {admin && (
          <button type="button" onClick={() => removed(product)}>
            <Link to="/home"> Remove</Link>
          </button>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    singleItem: state.singleProduct
  }
}

const mapDispatchToProps = {
  removed: removeProduct,
  oneProduct: oneItem
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
