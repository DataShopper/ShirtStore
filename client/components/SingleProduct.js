import React, {Component} from 'react'
import axios from 'axios'

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
      <div>
        <p>{product.name}</p>
        <p>{product.price}</p>
        <img src={product.imageUrl} />
        <p>{product.description}</p>
        <select
          name="sizeChosen"
          onChange={this.handleSelect}
          aria-required="true"
        >
          <option>size</option>
          {size.map((size, idx) => {
            return (
              <option key={idx} name="sizeChosen">
                {size}
              </option>
            )
          })}
        </select>
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
          <button type="button">ADD TO CART</button>
          <button type="button">VIEW CART</button>
          <button type="button">CONTINUE SHOPPING</button>
        </div>
      </div>
    )
  }
}

export default SingleProduct
