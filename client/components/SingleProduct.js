import React, {Component} from 'react'
import axios from 'axios'
import {Button} from 'semantic-ui-react'
import {Input} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import toastr from 'toastr'

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
    const {data} = await axios.get(`/api/products/${id}`)
    this.setState(data)
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
        name: this.state.name,
        id: this.state.id,
        sizeChosen: this.state.sizeChosen,
        colorChosen: this.state.colorChosen,
        categoryChosen: this.state.categoryChosen,
        qty: this.state.qty
      }
      localStorage.setItem(this.state.id, JSON.stringify(item))
      toastr.success('Success: Your shopping cart has been updated.')
    } catch (err) {
      toastr.err(err)
      console.error(err)
    }
  }

  render() {
    const product = this.state
    const size = product.sizes
    const color = product.color
    const category = product.category
    const objects = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
    if (this.state.loading) {
      return <div />
    }

    return (
      <div className="ui raised very padded text container segment">
        <p>{product.name}</p>
        <p>{product.price}</p>
        <img src={product.imageUrl} />
        <p>{product.description}</p>
        <Input list="size" placeholder="SIZE" />
        <datalist id="size">
          <option>size</option>
          {size.map((size, idx) => {
            return (
              <option key={idx} name="sizeChosen">
                {size}
              </option>
            )
          })}
        </datalist>
        <i className="large chess rook icon" />
        <Input list="category" placeholder="CATEGORY" />
        <select
          name="categoryChosen"
          onChange={this.handleSelect}
          aria-required="true"
        >
          <option>category</option>
          {category.map((category, idx) => {
            return <option key={idx}>{category}</option>
          })}
        </select>
        <select
          name="colorChosen"
          onChange={this.handleSelect}
          aria-required="true"
        >
          <option>color</option>
          {color.map((color, idx) => {
            return (
              <option
                key={idx}
                onChange={this.handleSelect}
                aria-required="true"
              >
                {color}
              </option>
            )
          })}
        </select>
        <select name="qty" onChange={this.handleSelect} aria-required="true">
          <option>quantity</option>
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
      </div>
    )
  }
}

export default SingleProduct
