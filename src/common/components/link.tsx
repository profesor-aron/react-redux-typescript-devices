import React from 'react'

import { ILink } from '../interfaces'

const style = {
  cursor: 'pointer'
}

export const Link = ({onClick, children}: ILink) => (
  <a style={style} onClick={() => onClick()}>
    {children}
  </a>
)
