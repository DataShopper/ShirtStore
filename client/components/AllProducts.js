import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store'
import {Link, Redirect} from 'react-router-dom'

class AllProducts extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true
    }
  }

  async componentDidMount() {
    // if (!this.props.user.id) {
    //   this.history.push('/guestHome')
    // }
    this.setState({loading: false})
    await this.props.retrieveData()
  }

  render() {
    const products = this.props.product || []
    const user = this.props.user || {}
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

    if (!user.id) {
      return (
        <div>
          <Redirect to="/home" />
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
    product: state.products,
    user: state.user
  }
}

const mapDispatchToProps = {
  retrieveData: fetchProducts
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
