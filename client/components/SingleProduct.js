import React, {Component} from 'react'
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
        strPrice: this.props.singleItem.strPrice,
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
    const size = product.sizes
    const color = product.color
    const category = product.category
    const removed = this.props.removed
    const objects = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
    if (this.state.loading) {
      return <div />
    }

    return (
      <div className="ui raised very padded centered text container segment">
        <p className="ui large centered header">{product.name}</p>
        <p className="ui small centered header">{product.strPrice}</p>
        <img src={product.imageUrl} />
        <p className="ui small centered header">{product.description}</p>
        {admin && <UpdateProduct />}
        <Input
          list="size"
          name="sizeChosen"
          placeholder="SIZE"
          onChange={this.handleSelect}
        />
        <datalist id="size" aria-required="true">
          {size.map((size, idx) => {
            return (
              <option key={idx} name="sizeChosen">
                {size}
              </option>
            )
          })}
        </datalist>
        <Input
          list="category"
          name="categoryChosen"
          placeholder="CATEGORY"
          onChange={this.handleSelect}
        />
        <datalist id="category" aria-required="true">
          {category.map((category, idx) => {
            return <option key={idx}>{category}</option>
          })}
        </datalist>
        <Input
          list="color"
          name="colorChosen"
          placeholder="COLOR"
          onChange={this.handleSelect}
        />
        <datalist id="color" aria-required="true">
          {color.map((color, idx) => {
            return <option key={idx}>{color}</option>
          })}
        </datalist>
        <Input
          list="quantity"
          name="quantity"
          placeholder="QUANTITY"
          onChange={this.handleSelect}
        />
        <datalist id="quantity" aria-required="true">
          {objects.map((object, idx) => {
            return <option key={idx}>{object}</option>
          })}
        </datalist>
        <div>
          {!admin && (
            <div>
              <Button type="submit" onClick={this.handleSubmit}>
                ADD TO CART
              </Button>
              <Button type="button">
                <Link to="/cart">VIEW CART</Link>
              </Button>
              <Button type="button">
                <Link to="/home">CONTINUE SHOPPING</Link>
              </Button>
            </div>
          )}
        </div>
        {admin && (
          <Button type="button" onClick={() => removed(product)}>
            <Link to="/home"> Remove</Link>
          </Button>
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
