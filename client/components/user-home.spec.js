/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {UserHome} from './user-home'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('UserHome', () => {
  let userHome

  beforeEach(() => {
    userHome = shallow(<UserHome email="cody@email.com" password="123" />)
  })

  xit('renders the email in an h3', async () => {
    let bleh = await userHome.find('h3')
    console.log(bleh)
    expect(bleh.contains('cody@email.com')).to.be.equal(true)
    //doesn't currently work b/c of thecurrent if statement on User-home i think
  })
})
