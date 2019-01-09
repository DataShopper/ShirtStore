import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store'

class SingleProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true
    }
    this.dropdownMenu = this.dropdownMenu.bind(this)
  }

  async componentDidMount() {
    const {retrieveSingleData, product} = this.props
    await retrieveSingleData(product.id)
    this.setState({loading: false})
  }

  dropdownMenu(productType) {
    return (
      <select>
        {productType.map(p => {
          return <option>{p}</option>
        })}
      </select>
    )
  }

  render() {
    const product = this.props.product || []

    if (this.state.loading) {
      return <div />
    }

    return (
      <div>
        <div>
          <p>{product.name}</p>
          <p>{product.price}</p>
          <p>{product.imageUrl}</p>
          <p>{product.description}</p>
          {() => this.dropdownMenu(product.sizes)}
          {() => this.dropdownMenu(product.color)}
          {() => this.dropdownMenu(product.category)}
        </div>
        <div>
          <button>ADD TO CART</button>
          <button>VIEW CART</button>
          <button>CONTINUE SHOPPING</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    product: state.product
  }
}

const mapDispatchToProps = dispatch => {
  return {
    retrieveSingleData: id => dispatch(fetchSingleProduct(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
