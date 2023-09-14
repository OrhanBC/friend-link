import React, { useContext, useState } from 'react'
import { Card,  CardContent, CardMedia, Typography, CardHeader, Avatar, CardActions, IconButton } from '@mui/material';
import { useUser } from '../../hooks/user';
import UserContext from '../../contexts/UserContext';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { usePost } from '../../hooks/posts';


const FriendsPost = ({ post }) => {
  const { currentUser } = useContext(UserContext);
  const { user } = useUser(post.userID);
  const { likePost, unlikePost } = usePost(post.id);
  const [liked, setLiked] = useState(post.likes.includes(currentUser.uid));
  if (user === undefined || user == null) return (<></>);
  async function handleLike() {
    if (liked) {
        await unlikePost();
        setLiked(false);
    } else {
        await likePost();
        setLiked(true);
    }
  }
  return (
    <Card sx={{mt: 2}}>
        <CardHeader
        avatar={
            <Avatar src={user.imageURL} />
        }
        title={ user.username }/>
            
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

        <CardActions>
            <IconButton onClick={handleLike}>
                {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
            { post.likes.length }
        </CardActions>
        
    </Card>
  )
}

export default FriendsPost
