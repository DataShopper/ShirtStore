import axios from 'axios'

const PURCHASED_ORDERS = 'PURCHASED_ORDERS'

const purchasedOrders = orders => ({
  type: PURCHASED_ORDERS,
  orders
})

export const getPurchasedOrders = userId => {
  return async dispatch => {
    try {
      // OB/MS: logs
      console.log('id', userId)
      const {data} = await axios.get(`/api/orders?userId=${userId}`)
      // OB/MS: can use axios.get('/whatever', {params: {userId}}) and that will construct the query string for you
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
