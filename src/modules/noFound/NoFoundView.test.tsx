import React from 'react'
import { createMockStore } from 'redux-test-utils'

import { shallowWithStore } from '../../config/test/setupEnzyme'
import { NoFoundContainer } from './NoFound'

describe('NoFound', () => {

  it('should handle state and actions', () => {

    const testState = {}

    const store = createMockStore(testState)
    const component = shallowWithStore(<NoFoundContainer />, store)

    expect(component.dive().find('#goHome').prop('onClick')).toBeInstanceOf(Function)
  })
})
