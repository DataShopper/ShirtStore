import React, {Component} from 'react'
import toastr from 'toastr'
import {connect} from 'react-redux'
import {removeProduct, oneItem} from '../store'
import {Link} from 'react-router-dom'

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
    try {
      let item = {
        name: this.props.name,
        productId: this.props.singleItem.id,
        size: this.state.sizeChosen,
        price: this.props.singleItem.price,
        color: this.state.colorChosen,
        category: this.state.categoryChosen,
        quantity: this.state.quantity,
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
      <div>
        <p>{product.name}</p>
        <p>{product.price}</p>
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
          <button type="submit" onClick={this.handleSubmit}>
            ADD TO CART
          </button>
          <button type="button">VIEW CART</button>
          <button type="button">CONTINUE SHOPPING</button>
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
