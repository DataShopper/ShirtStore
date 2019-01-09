import React from 'react'
import {connect} from 'react-redux'
import {getPurchasedOrders} from '../../store/orders'

class PurchasedOrders extends React.Component {
  constructor() {
    super()
  }
  async componentDidMount() {
    await this.props.getPurchasedOrders(this.props.id)
  }
  render() {
    const {purchasedOrders} = this.props || []
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
