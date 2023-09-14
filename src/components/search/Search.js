import React, { useContext, useState } from 'react'
import { TextField, Container } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import UserContext from '../../contexts/UserContext';
import { useUsers } from '../../hooks/user';
import User from './User';

const Search = () => {
  const [ search, setSearch ] = useState("");
  const { currentUser } = useContext(UserContext);
  const { users } = useUsers(currentUser.uid);
  if (users === undefined || users == null) {
    return (<></>)
  }
  return (
    <Container sx={{ mt:5 }}>
      <TextField
      onChange={(e) => setSearch(e.target.value)}
      variant="outlined"
      fullWidth
      placeholder="Search..."
      InputProps={{
        startAdornment: (
          <SearchIcon color="action" />
        ),
      }}
    />
    { users.map((user) => {
       if (search === "" || user.username.startsWith(search)) {
        return (
            <User key={ user.id } user= { user } currentUser={ currentUser } />
           )
       }
    })}
    </Container>
  )
}

export default Search
