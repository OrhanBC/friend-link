import React, { useContext, useEffect, useState } from 'react'
import { useUser } from '../../hooks/user'
import UserContext from '../../contexts/UserContext';
import { Typography, Container } from '@mui/material';
import Request from './Request';

const Requests = () => {
    const { currentUser } = useContext(UserContext);
    const { user } = useUser(currentUser.uid);
    if (user === undefined || user == null) {
      return (<>Loading...</>)
    }
    return (
      <Container>
        { user.requests.length === 0 ?
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "75vh",
          }}> <Typography variant='h3'>You don't have any friend requests</Typography> </div> : <></> }
      
      {user.requests.map((userID, index) => {
        return (<Request key={ userID } userID = { userID } index={ index }/>)
      })}
      </Container>
    )
}

export default Requests
