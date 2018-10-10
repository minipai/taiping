import React from 'react'
import { Link } from 'gatsby'
import Image from './image'

const Postside = ({ title, photo, content, link }) => (
  <div className="post_thumbnail">
    <div className="image-wrap">
      <Image src={photo} />
    </div>
    <div className="content-text">
      <Link to={link}>{title}</Link>
    </div>
  </div>
)

export default Postside
