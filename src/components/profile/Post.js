import React from 'react'
import { Card,  CardContent, CardMedia, Typography } from '@mui/material';
import { usePost } from '../../hooks/posts';

const Post = ({ id }) => {
  const { post } = usePost(id);
  if (post === undefined || post == null) return (<></>)
  return (
    <Card sx={{mt: 2}}>
        <CardMedia
  sx={{
    height: 600, // Set your desired fixed height  // Set your desired fixed width
    position: 'relative',
    overflow: 'hidden',
  }}
>
  <div
    style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <img
      src={post.imageURL}
      alt="Post"
      style={{
        objectFit: 'contain',
        maxWidth: '100%',
        maxHeight: '100%',
      }}
    />
  </div>
</CardMedia>

        {post.description !== "" ? <CardContent>
            <Typography>{ post.description }</Typography> 
        </CardContent> : <></>}
        
    </Card>
  )
}

export default Post
