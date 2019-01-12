import axios from 'axios'

/**
 * ACTION TYPES
 */
const PRODUCTS = 'PRODUCTS'
const ADD_PRODUCT = 'ADD_PRODUCT'

/**
 * ACTION CREATORS
 */
export const getProducts = products => ({
  type: PRODUCTS,
  products
})

export const addProduct = product => ({
  type: ADD_PRODUCT,
  product
})
/**
 * THUNK CREATORS
 */

export const addOneProduct = product => async dispatch => {
  try {
    const {data} = await axios.post('/api/products', product)
    dispatch(addProduct(data))
  } catch (err) {
    console.error(err)
  }
}

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
const products = (state = [], action) => {
  switch (action.type) {
    case PRODUCTS:
      return action.products
    case ADD_PRODUCT:
      const product = action.product
      return [...state, product]
    default:
      return state
  }
}

export default products
