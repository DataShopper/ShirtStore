import React, {Component} from 'react'
import axios from 'axios'
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
    console.log(this.state)
  }

  async handleSelect(evt) {
    await this.setState({
      [evt.target.name]: evt.target.value
    })
    console.log(this.state)
  }

  handleSubmit(evt) {
    evt.preventDefault()
    try {
      //const value = this.name
      let item = {
        name: this.state.name,
        id: this.state.id,
        sizeChosen: this.state.sizeChosen,
        colorChosen: this.state.colorChosen,
        categoryChosen: this.state.categoryChosen,
        qty: 3
        //this.qty Waiting on a quantity dropdown
      }
      //localStorage.setItem('brug', 'hsdkajhfkjhsdkjfhks')
      localStorage.setItem(this.state.id, JSON.stringify(item))
      console.log(item)
      toastr.success('Success: Your Account info has been modified.')
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
