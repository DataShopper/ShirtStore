import axios from 'axios'

const SINGLE_ITEM = 'SINGLE_ITEM'

export const getItem = product => ({
  type: SINGLE_ITEM,
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

const singleProduct = (state = {}, action) => {
  switch (action.type) {
    case SINGLE_ITEM:
      return action.product
    default:
      return state
  }
}

export default singleProduct
