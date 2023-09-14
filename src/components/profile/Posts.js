import React from 'react';
import Post from './Post';


const Posts = ({ posts }) => {
  return (
    <div>
      {posts.map((post) => {
        return (<Post id={ post } />)
      })}
    </div>
  )
}

export default Posts
