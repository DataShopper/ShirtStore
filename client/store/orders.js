import axios from 'axios'

const PURCHASED_ORDERS = 'PURCHASED_ORDERS'

const purchasedOrders = orders => ({
  type: PURCHASED_ORDERS,
  orders
})

export const getPurchasedOrders = userId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/orders`, {params: {userId}})
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
