import React from 'react'
import { Link } from 'gatsby'
import Image from './image'

const Postbox = ({ title, photo, content, link }) => (
  <div className="post">
    <div className="post-media">
      <div className="image-wrap">
        <Image src={photo} />
      </div>
    </div>
    <div className="post-body">
      <div className="post-title">
        <h2>
          <Link to={link}>{title}</Link>
        </h2>
      </div>

      <div
        className="post-entry"
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <div className="post-link">
        <Link to={link}>詳細資訊</Link>
      </div>
    </div>
  </div>
)

export default Postbox
