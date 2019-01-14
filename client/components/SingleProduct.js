import React, {Component} from 'react'
import axios from 'axios'
import {Input, Button} from 'semantic-ui-react'
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
      <div className="ui raised very padded centered text container segment">
        <p className="ui large centered header">{product.name}</p>
        <p className="ui small centered header">{product.price}</p>
        <img src={product.imageUrl} />
        <p className="ui small centered header">{product.description}</p>
        <Input list="size" placeholder="SIZE" />
        <datalist id="size">
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
        <datalist
          id="category"
          aria-required="true"
          name="categoryChosen"
          onChange={this.handleSelect}
        >
          {category.map((category, idx) => {
            return <option key={idx}>{category}</option>
          })}
        </datalist>
        <Input list="color" placeholder="COLOR" />
        <datalist
          id="color"
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
        </datalist>
        <Input list="quantity" placeholder="QUANTITY" />
        <datalist
          id="quantity"
          name="qty"
          onChange={this.handleSelect}
          aria-required="true"
        >
          <option>quantity</option>
          {objects.map((object, idx) => {
            return <option key={idx}>{object}</option>
          })}
        </datalist>
        <div>
          <Button type="submit" onClick={this.handleSubmit}>
            ADD TO CART
          </Button>
          <Button type="button">VIEW CART</Button>
          <Button type="button">CONTINUE SHOPPING</Button>
        </div>
      </div>
    )
  }
}

export default SingleProduct
