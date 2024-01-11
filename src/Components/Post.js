import React from 'react'
import {Link} from 'react-router-dom'

const Post = ({post}) => {
  const link = '/post/'+post.id;
  return (
    <article className='Post'>
      <Link to={link} className='Post-Heading'>
        <h2>{post.title}</h2>
        <p>{post.datetime}</p>
      </Link>
      <p>
        {post.body.length<=25 ? post.body:post.body.slice(0,25)+'...'}
      </p>
    </article>
  )
}

export default Post
