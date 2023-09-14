import React from 'react'
import FriendsPost from './FriendsPost'
import { useFriendsPosts } from '../../hooks/posts'

const FriendsPosts = ({ friends }) => {
  const { posts } = useFriendsPosts(friends);
  if ( posts === undefined || posts == null) return (<></>);
  return (
    <div>
      {posts.map(post => {
        return (<FriendsPost post={ post }/>)
      })}
    </div>
  )
}

export default FriendsPosts
