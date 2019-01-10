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
    // OB/MS: I like that you are considering error handling, go beyond! Think about reporting the error to the end user (instead of just putting it into the console), for example you might use a "toast" notification, like this: https://tomchentw.github.io/react-toastr/
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
// OB/MS: polymorphic state that is sometimes an array and sometimes an object, can lead to difficult bugs, more difficult to maintain; think of your redux store state as constant shape; instead consider having two separate reducers
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
