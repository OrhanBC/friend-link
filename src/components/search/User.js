import { Avatar, Box, Typography, Stack, Button } from '@mui/material'
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CheckIcon from '@mui/icons-material/Check';
import React from 'react'
import { useUser } from '../../hooks/user';

const User = ({ user, currentUser }) => {
  const { sendRequest, requestLoading } = useUser(user.id);
  const { user: currentUserData } = useUser(currentUser.uid);
  if (currentUserData === undefined || currentUserData == null) return (<>Loading...</>)
  return (
    <Box sx={{mt:2, border: '1px solid #ccc', borderRadius: '5px', padding: '8px', display: 'flex', justifyContent: 'space-between' }}>
        <Stack spacing={3} direction='row' alignItems='center'>
            <Avatar src={user.imageURL} sx={{ width: 60, height: 60 }} />
            <Typography variant='h5'>{ user.username }</Typography>
            <Typography variant='h6'>{ user.friends.length } Friends</Typography>
            <Typography variant='h6'>{ user.posts.length } Posts</Typography>
        </Stack>
        { user.friends.includes(currentUser.uid) || user.requests.includes(currentUser.uid) || currentUserData.requests.includes(user.id)  ? <></> : <Button variant='contained' startIcon={<PersonAddIcon />} onClick={() => sendRequest()} disabled={requestLoading}>Send Friend Request</Button> }
        { user.requests.includes(currentUser.uid) ? <Button variant='contained' disabled startIcon={<CheckIcon />}>Friend Request Sent</Button> : <></>}
        { currentUserData.requests.includes(user.id) ? <Button variant='contained' disabled startIcon={<CheckIcon />}>Friend Request Receieved</Button> : <></>}
    </Box>
  )
}

export default User
