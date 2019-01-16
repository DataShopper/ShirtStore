import axios from 'axios'
const SEARCH = 'SEARCH'

const searchTerm = search => ({
  type: SEARCH,
  search
})

export const searching = state => async dispatch => {
  try {
    let term, field
    for (let key in state) {
      field = key
      term = state[key].toLowerCase()
    }
    const {data} = await axios.get('/api/search', {
      params: {term: term, field: field}
    })
    dispatch(searchTerm(data))
  } catch (err) {
    console.error(err)
  }
}

const searchResults = (state = [], action) => {
  switch (action.type) {
    case SEARCH:
      return action.search
    default:
      return state
  }
}

export default searchResults
