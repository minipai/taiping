import React from 'react'

const buildSrc = ({ src, width = 100, height = 100 }) =>
  src || `//via.placeholder.com/${width}x${height}`

const Image = props => <img {...props} src={buildSrc(props)} />

export default Image
