import axios from 'axios'

/**
 * ACTION TYPES
 */
const PRODUCTS = 'PRODUCTS'

/**
 * ACTION CREATORS
 */
export const getProducts = products => ({
  type: PRODUCTS,
  products
})

/**
 * THUNK CREATORS
 */
export const fetchProducts = () => async dispatch => {
  try {
    const res = await axios.get('/api/products')
    dispatch(getProducts(res.data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
const product = (state = [], action) => {
  switch (action.type) {
    case PRODUCTS:
      return action.products
    default:
      return state
  }
}

export default product
