import React from 'react'
import Image from './image'

const Post = ({ title, photo, content }) => (
  <div className="post">
    <div className="post-media">
      <div className="sticky-icon">
        <i className="fa fa-thumb-tack" />
      </div>
      <div className="image-wrap">
        <Image src={photo} />
      </div>
    </div>
    <div className="post-body" style={{ padding: '30px' }}>
      <div className="post-title">
        <h1>{title}</h1>
      </div>

      <div
        className="post-entry"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  </div>
)

export default Post
