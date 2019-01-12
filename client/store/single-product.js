import axios from 'axios'
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
    const {data} = await axios.get(`/api/products/${product.id}`)
    const object = updating(data, product)
    await axios.put(`/api/products/${product.id}`, object)
    dispatch(update(object))
  } catch (err) {
    console.error(err)
  }
}

export const updating = (old, student) => {
  let obj = {}
  for (let key in old) {
    if (
      student[key] === undefined ||
      student[key] === '' ||
      student[key] === []
    ) {
      obj[key] = old[key]
    } else {
      obj[key] = student[key]
    }
  }
  return obj
}

const singleProduct = (state = {}, action) => {
  switch (action.type) {
    case SINGLE_ITEM:
      return action.product
    case UPDATE_PRODUCT:
      const product = action.product
      return product
    default:
      return state
  }
}

export default singleProduct
