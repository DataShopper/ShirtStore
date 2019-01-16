import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProducts, addOneProduct, removeProduct} from '../store'
import ProductComponent from './ProductComponent'
import toastr from 'toastr'

class AllProducts extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.removed = this.removed.bind(this)
  }

  async removed(product) {
    try {
      await this.props.remove(product)
      toastr.success(`Success: The product '${product.name}' has been removed.`)
    } catch (err) {
      toastr.error(err)
      console.error(err)
    }
  }

  async load() {
    if (!this.state.loading) {
      this.setState({loading: true})
    }
    await this.props.retrieveData()
    this.setState({loading: false})
  }
  componentDidMount() {
    setTimeout(() => {
      this.load()
    }, 500)
  }

  async handleChange(evt) {
    await this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  async handleSubmit(evt) {
    evt.preventDefault()
    try {
      await this.props.addOne(this.state)
      toastr.success(
        `Success: The product '${this.state.name}' has been added.`
      )
    } catch (err) {
      toastr.error(err)
      console.error(err)
    }
  }

  render() {
    const products = this.props.products || []
    const user = this.props.user
    if (this.state.loading) {
      return <div className="fun">Loading</div>
    }

    if (products.length < 1) {
      return (
        <div>
          <p>No products to list.</p>
        </div>
      )
    }
    return (
      <div>
        <ProductComponent
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          removed={this.removed}
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    products: state.products,
    user: state.user
  }
}

const mapDispatchToProps = {
  retrieveData: fetchProducts,
  addOne: addOneProduct,
  remove: removeProduct
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
