import React, {Component} from 'react'
import axios from 'axios'
import {Button} from 'semantic-ui-react'
import {Input} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

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
  }

  async componentDidMount() {
    const id = this.props.match.params.productId
    const {data} = await axios.get(`/api/products/${id}`)
    this.setState(data)
    this.setState({loading: false})
  }

  handleSelect(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  render() {
    const product = this.state
    const size = product.sizes
    const color = product.color
    const category = product.category
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
            return <option key={idx}>{color}</option>
          })}
        </select>
        <div>
          <Button type="button">ADD TO CART</Button>
          <Button type="button">VIEW CART</Button>
          <Button type="button">CONTINUE SHOPPING</Button>
        </div>
      </div>
    )
  }
}

export default SingleProduct
