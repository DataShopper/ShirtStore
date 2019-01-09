import React from 'react'
import {connect} from 'react-redux'
import {getPurchasedOrders} from '../store/orders'

class PurchasedOrders extends React.Component {
  constructor() {
    super()
  }
  async componentDidMount() {
    console.log('id', this.props.id)
    await this.props.getPurchasedOrders(this.props.id)
  }
  render() {
    console.log('hello')
    //purchasedOrders.id, userId
    //product.id
    //user.id
    const {purchasedOrders, product} = this.props || []
    return (
      <div>
        <ul>
          {purchasedOrders.map(order => {
            console.log('order', order)
            const shirts = order.orderdetails || []
            return (
              <div key={order.id}>
                {shirts.map(shirt => {
                  return (
                    <li key={shirt.id}>
                      {shirt.color}
                      <br />
                      {shirt.size}
                      <br />
                      {shirt.imageUrl}
                    </li>
                  )
                })}
              </div>
            )
          })}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    products: state.product,
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
