import React from 'react'
import {connect} from 'react-redux'
import {getPurchasedOrders} from '../store/orders'
import {stringifyPrice} from '../../utils'

class PurchasedOrders extends React.Component {
  async componentDidMount() {
    await this.props.getPurchasedOrders(this.props.user.id)
  }
  render() {
    const {purchasedOrders} = this.props || []
    return (
      <div>
        <ul>
          {purchasedOrders.map(order => {
            const shirts = order.details || []
            return (
              <li key={order.id}>
                {shirts.map(shirt => {
                  return (
                    <div key={shirt.id}>
                      <img src={shirt.imageUrl} />
                      <div>Order #: {order.id}</div>
                      <div>{shirt.color}</div>
                      <div>{shirt.size}</div>
                      <div>{shirt.quantity}</div>
                      <div>{stringifyPrice(order.totalPrice)}</div>
                    </div>
                  )
                })}
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    products: state.products,
    purchasedOrders: state.purchasedOrders,
    user: state.user
  }
}

const mapDispatchToProps = {
  getPurchasedOrders: getPurchasedOrders
}

export default connect(mapStateToProps, mapDispatchToProps)(PurchasedOrders)
