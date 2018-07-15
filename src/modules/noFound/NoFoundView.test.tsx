import React from 'react'
import { createMockStore } from 'redux-test-utils'
import { ShallowWrapper } from 'enzyme'
import { shallowWithStore } from '../../config/test/setupEnzyme'

import { NoFoundContainer } from './NoFound'

describe('NoFound', () => {

  let wrapper: ShallowWrapper

  it('simulates click events', () => {
    const changeView = jest.fn()
    const testState = {}
    const store = createMockStore(testState)
    wrapper = shallowWithStore(<NoFoundContainer />, store)
    wrapper.dive().find('#goHome').simulate(
      'click',
      {changeView}
    )
  })
})
