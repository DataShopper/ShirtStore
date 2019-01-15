import axios from 'axios'

/**
 * ACTION TYPES
 */
const PRODUCTS = 'PRODUCTS'
const ADD_PRODUCT = 'ADD_PRODUCT'
const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
const SEARCH = 'SEARCH'

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

export const remove = product => ({
  type: REMOVE_PRODUCT,
  product
})

export const search = search => ({
  type: SEARCH,
  search
})
/**
 * THUNK CREATORS
 */

export const searchAll = () => async dispatch => {
  try {
    const {data} = await axios.get(`/api/products`)
    dispatch(search(data))
  } catch (err) {
    console.error(err)
  }
}

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

export const removeProduct = product => async dispatch => {
  try {
    await axios.delete(`/api/products/${product.id}`)
    dispatch(remove(product))
  } catch (err) {
    console.error(err)
  }
}

export const replace = (arr, product) => {
  for (let i = 0; i < arr.length; i++) {
    if (product.id === arr[i].id) {
      arr.splice(i, 1, product)
    }
  }
  return arr
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
    case REMOVE_PRODUCT:
      const id = action.product.id
      const newArr = [...state]
      const arr = newArr.filter(elem => elem.id !== id)
      return arr
    case SEARCH:
      return action.search
    default:
      return state
  }
}

export default products
