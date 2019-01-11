import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProducts, addOneProduct} from '../store'
import {Link} from 'react-router-dom'
import ProductComponent from './ProductComponent'

class AllProducts extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async componentDidMount() {
    this.setState({loading: false})
    await this.props.retrieveData()
  }

  async handleChange(evt) {
    await this.setState({
      [evt.target.name]: evt.target.value
    })
    console.log('state', this.state)
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
          state={this.props}
          user={user}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
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
  addOne: addOneProduct
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
