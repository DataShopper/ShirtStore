import React from 'react'
import {ProductForm} from './index'
import {updateProduct} from '../store'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

class UpdateProduct extends React.Component {
  constructor() {
    super()
    this.state = {
      price: 0,
      name: '',
      color: '',
      sizes: '',
      description: '',
      category: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async componentDidMount() {
    await this.setState(this.props.singleProduct)
    await this.setState({
      color: this.state.color.join(', '),
      sizes: this.state.sizes.join(', '),
      category: this.state.category.join(', ')
    })
  }
  async handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  async handleSubmit(evt) {
    evt.preventDefault()
    await this.props.update(this.state)
  }
  render() {
    const handleChange = this.handleChange
    const handleSubmit = this.handleSubmit
    return (
      <ProductForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        state={this.state}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    singleProduct: state.singleProduct
  }
}

const mapDispatchToProps = {
  update: updateProduct
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UpdateProduct)
)
