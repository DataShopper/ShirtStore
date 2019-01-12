/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {addOneProduct, fetchProducts} from './product'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../history'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = []

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('addOneProduct', () => {
    xit('eventually dispatches the ADD_PRODUCT action', async () => {
      const fakeProduct = {
        name: 'Test Shirt',
        price: 2200,
        sizes: 'S, M',
        style: 'heyyyy',
        count: 11,
        color: 'Red, Blue, Black, Green, Gold, Orange, Pink, Grey, Purple',
        imageUrl: '/defaultImage1.jpeg',
        description: 'This shirt is testy and you love testy.',
        category: 'Women, Men, Children'
      }
      mockAxios.onGet('/api/products').replyOnce(200, fakeProduct)
      await store.dispatch(addOneProduct())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('ADD_PRODUCT')
      //console.log(actions[0])
      expect(actions[0].name).to.be.deep.equal('Test Shirt')
    })
  })

  describe('fetchProducts', () => {
    xit('fetchProducts: eventually dispatches the PRODUCTS action', async () => {
      mockAxios.onPost('/api/products').replyOnce(204)
      await store.dispatch(fetchProducts())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('PRODUCTS')
      expect(history.location.pathname).to.be.equal('/products')
    })
  })
})
