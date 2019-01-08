import React, {Component} from 'react'
import {Link} from 'react-router-dom'
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
    await this.props.retrieveData
    this.setState({loading: false})
  }

  render() {
    if (this.state.loading) {
      return <div />
    }

    if (this.props.products.length < 1) {
      return (
        <div>
          <p>No products to list.</p>
        </div>
      )
    }

    return (
      <div>
        {this.props.products.map(p => {
          return <p>{p.name}</p>
        })}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  products: state.products
})

const mapDispatchToProps = dispatch => ({
  retrieveData: () => dispatch(fetchProducts())
})

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
