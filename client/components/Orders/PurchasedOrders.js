import React from 'react'
import {connect} from 'react-redux'
import {getPurchasedOrders} from '../../store/orders'

class PurchasedOrders extends React.Component {
  constructor() {
    super()
    this.state = {
      loading: true
    }
  }
  async componentDidMount() {
    await this.props.getPurchasedOrders(this.props.id)
    this.setState({loading: false})
  }

  render() {
    const {purchasedOrders} = this.props || []
    if (this.state.loading) {
      return <div>Loading</div>
    }
    return (
      <div>
        <ul>
          {purchasedOrders.map(order => {
            return <li key={order.id}>{order.totalPrice}</li>
          })}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    purchasedOrders: state.purchasedOrders
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getPurchasedOrders: userId => dispatch(getPurchasedOrders(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PurchasedOrders)
