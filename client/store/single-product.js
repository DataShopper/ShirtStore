import axios from 'axios'
import history from '../history'

export const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
const SINGLE_ITEM = 'SINGLE_ITEM'

export const getItem = product => ({
  type: SINGLE_ITEM,
  product
})

export const update = product => ({
  type: UPDATE_PRODUCT,
  product
})

export const oneItem = id => async dispatch => {
  try {
    const {data} = await axios.get(`/api/products/${id}`)
    dispatch(getItem(data))
  } catch (err) {
    console.error(err)
  }
}

export const updateProduct = product => async dispatch => {
  try {
    await axios.put(`/api/products/${product.id}`, product)
    dispatch(update(product))
    history.push('/home')
  } catch (err) {
    console.error(err)
  }
}

const singleProduct = (state = {}, action) => {
  switch (action.type) {
    case SINGLE_ITEM:
      return action.product
    case UPDATE_PRODUCT:
      const product2 = action.product
      product2.sizes = product2.sizes.split(',')
      product2.color = product2.color.split(',')
      product2.category = product2.category.split(',')
      return product2
    default:
      return state
  }
}

export default singleProduct
