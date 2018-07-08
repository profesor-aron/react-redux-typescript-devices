import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import sinon, { SinonSpy } from 'sinon'

import { Link } from './Link'

describe('Link', () => {

  let onClick: SinonSpy
  let children: string
  let wrapper: ShallowWrapper

  beforeEach(() => {
    onClick = sinon.spy()
    children = 'Go to home page'
  })

  it('should render <a /> tag', () => {
    wrapper = shallow(<Link onClick={onClick} children={children} />)
    expect(wrapper.find('a')).toHaveLength(1)
  })

  it('simulates click events', () => {
    wrapper = shallow(<Link onClick={onClick} children={children} />)
    wrapper.find('a').simulate('click')
    expect(onClick.calledOnce).toEqual(true)
  })
})
