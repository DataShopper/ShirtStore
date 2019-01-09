import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store'

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
            <div key={p.id}>
              <p>{p.name}</p>
              <p>{p.price}</p>
              <img src={p.imageUrl} />
              <p>{p.description}</p>
            </div>
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

const mapDispatchToProps = dispatch => {
  return {
    retrieveData: () => dispatch(fetchProducts())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
