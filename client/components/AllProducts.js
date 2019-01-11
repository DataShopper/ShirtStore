import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProducts, addOneProduct, removeProduct} from '../store'
import ProductComponent from './ProductComponent'

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
    await this.props.remove(product)
  }

  async componentDidMount() {
    this.setState({loading: false})
    await this.props.retrieveData()
  }

  async handleChange(evt) {
    await this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  async handleSubmit(evt) {
    evt.preventDefault()
    await this.props.addOne(this.state)
  }

  render() {
    const products = this.props.products || []
    const user = this.props.user
    if (this.state.loading) {
      return <div />
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
