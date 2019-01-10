import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store'
import {Link} from 'react-router-dom'

class AllProducts extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true
    }
  }

  async componentDidMount() {
    await this.props.retrieveData()
    this.setState({loading: false})
  }

  render() {
    const products = this.props.product || []
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
        {products.map(p => {
          return (
            <Link to={`/products/${p.id}`} key={p.id}>
              <div>
                <p>{p.name}</p>
                <p>{p.price}</p>
                <img src={p.imageUrl} />
                <p>{p.description}</p>
              </div>
            </Link>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    product: state.product
  }
}

// OB/MS: fun shorthand object form for mapDispatchToProps; this shorthand works when you have a mapDispatchToProps function that returns an object where each key is a method that calls a thunk and dispatches it. Such a common pattern that redux allows a shorthand
/*
const mapDispatchToProps = {
  retrieveData: fetchProducts
};
*/
const mapDispatchToProps = dispatch => {
  return {
    retrieveData: () => dispatch(fetchProducts())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
