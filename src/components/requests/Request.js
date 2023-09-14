import { Avatar, Box, Typography, Stack, Button } from '@mui/material'
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react'
import { useUser } from '../../hooks/user';

const Request = ({ userID, index }) => {
  const { user, acceptRequest, declineRequest, requestLoading } = useUser(userID);
  if (user === undefined || user == null) return (<>Loading...</>)
  console.log(userID);
  return (
    <Box sx={{mt:2, border: '1px solid #ccc', borderRadius: '5px', padding: '8px', display: 'flex', justifyContent: 'space-between' }}>
        <Stack spacing={3} direction='row' alignItems='center'>
            <Avatar src={user.imageURL} sx={{ width: 60, height: 60 }} />
            <Typography variant='h5'>{ user.username }</Typography>
            <Typography variant='h6'>{ user.friends.length } Friends</Typography>
            <Typography variant='h6'>{ user.posts.length } Posts</Typography>
        </Stack>
        <Stack spacing={3} direction='row' alignItems='center'>
            <Button disabled={ requestLoading } variant='contained' disableElevation color='success' onClick={() => acceptRequest(index)}><CheckIcon /></Button>
            <Button disabled={ requestLoading } variant='contained' disableElevation color='error' onClick={() => declineRequest(index)}><CloseIcon /></Button>
        </Stack>
        
    </Box>
  )
}

export default Request
