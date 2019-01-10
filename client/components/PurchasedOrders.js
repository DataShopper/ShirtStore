import React from 'react'
import {connect} from 'react-redux'
import {getPurchasedOrders} from '../store/orders'

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
            const shirts = order.orderdetails || []
            return (
              <li key={order.id}>
                {shirts.map(shirt => {
                  return (
                    <div key={shirt.id}>
                      {shirt.color}
                      <br />
                      {shirt.size}
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
    id: state.user.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getPurchasedOrders: userId => dispatch(getPurchasedOrders(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PurchasedOrders)
