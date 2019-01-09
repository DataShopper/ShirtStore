import axios from 'axios'

const PURCHASED_ORDERS = 'PURCHASED_ORDERS'

const purchasedOrders = orders => ({
  type: PURCHASED_ORDERS,
  orders
})

export const getPurchasedOrders = userId => {
  return async dispatch => {
    try {
      console.log('id', userId)
      const {data} = await axios.get(`/api/orders/${userId}`)
      dispatch(purchasedOrders(data))
    } catch (error) {
      console.error(error)
    }
  }
}

const orderReducer = (state = [], action) => {
  switch (action.type) {
    case PURCHASED_ORDERS:
      return action.orders
    default:
      return state
  }
}

export default orderReducer
