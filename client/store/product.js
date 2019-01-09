import axios from 'axios'

/**
 * ACTION TYPES
 */
const PRODUCTS = 'PRODUCTS'
const SINGLE_PRODUCT = 'PRODUCT'

/**
 * ACTION CREATORS
 */
export const getProducts = products => ({
  type: PRODUCTS,
  products
})

export const getSingleProduct = singleProduct => ({
  type: SINGLE_PRODUCT,
  singleProduct
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

export const fetchSingleProduct = id => async dispatch => {
  try {
    const res = await axios.get(`/api/products/${id}`)
    dispatch(getSingleProduct(res.data))
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
    case SINGLE_PRODUCT:
      return action.singleProduct
    default:
      return state
  }
}

export default product
