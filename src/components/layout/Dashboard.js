import React, { useContext, useEffect, useState } from 'react'
import { useUser } from '../../hooks/user'
import UserContext from '../../contexts/UserContext';
import { Typography, Container } from '@mui/material';
import FriendsPosts from '../posts/FriendsPosts';

const Dashboard = () => {
  const { currentUser } = useContext(UserContext);
  const { user } = useUser(currentUser.uid);
  if (user === undefined || user == null) {
    return (<></>)
  }
  return (
    <Container>
       
      { user.friends.length === 0 ?  <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "75vh",
      }}> <Typography variant='h3'>Add Friends to See Their Posts Here!</Typography> </div> : <FriendsPosts friends={ user.friends} /> }
    
    </Container>
  )
}

export default Dashboard
