import { Avatar, Container, Typography, Box, Button, Modal, TextField } from '@mui/material'
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useUser } from '../../hooks/user'
import { styled } from '@mui/material/styles';
import { usernameValidate } from '../../utils/form-validate';
import { toast } from 'react-toastify';
import UserContext from '../../contexts/UserContext'
import Posts from './Posts';
import EditIcon from '@mui/icons-material/Edit';
import FileUploadIcon from '@mui/icons-material/FileUpload';

const VisuallyHiddenInput = styled('input')`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const Profile = () => {
  const { currentUser } = useContext(UserContext);
  const { user, changeUsername, usernameLoading, changeProfilePicture, imageLoading, makePost, postLoading } = useUser(currentUser.uid);
  const [editOpen, setEditOpen] = useState(false);
  const [postOpen, setPostOpen] = useState(false);
  const [postDescription, setDescription] = useState("");
  const [postImage, setPostImage] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  if (user === undefined || user == null) return (<></>);
  async function handleUsername(data) {
    changeUsername(data.username);
  }
  async function handleProfilePicture(e) {
    if (e.target.files[0]) {
        changeProfilePicture(e.target.files[0], user.imageURL);
    }
  }
  async function handlePost(e) {
    e.preventDefault();
    if (postImage) {
        makePost(postDescription, postImage);
        document.getElementById("post-form").reset();
        setDescription("");
        setPostImage(null);
    } else {
        toast.error("Please choose a file", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
  }
  return (
    <Container sx={{paddingTop: "60px", paddingBottom: "60px" }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
            <Avatar src={ user.imageURL } sx={{ width: 120, height: 120 }} />
            <Typography sx={{ marginTop: "10px" }} variant='h5'> { user.username }</Typography>
        </Box>
        <Typography variant='h5'> { user.friends.length } Friends </Typography>
        <Typography variant='h5'> { user.posts.length } Posts </Typography>
        <Button 
            variant="contained"
            disableElevation
            startIcon={<EditIcon />}
            onClick={() => setEditOpen(true)}>
                Edit Profile
            </Button>
        <Button
            variant="contained" 
            disableElevation
            onClick={() => setPostOpen(true)}>
                Make a Post
        </Button>
        <Modal
            open= {editOpen}
            onClose={() => setEditOpen(false)}
            aria-labelledby="edit-modal-title"
            aria-describedby="edit-modal-description"
        >
        <Box sx={modalStyle}>
          <Typography id="edit-modal-title" variant="h6" component="h2">
            Edit Profile
          </Typography>
          <Box id="edit-modal-description" sx={{ mt: 2, display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
            <form onSubmit={handleSubmit(handleUsername)}>
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
                    <TextField label="Username" placeholder='Enter username' error={ errors.username } helperText={ errors.username && errors.username.message } {...register("username", usernameValidate)}></TextField>
                    <Button fullWidth sx={{mt: 2}} variant='contained' type='submit' disabled={ usernameLoading } >Change Username</Button>
                </Box>
            </form>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
            <Button
                component="label"
                variant="contained"
                startIcon={<FileUploadIcon />}
                href="#file-upload"
            >
                Change Profile Picture
            <VisuallyHiddenInput type="file" accept='image/*' onChange={ handleProfilePicture } disabled={ imageLoading } />
            </Button>
            </Box>
          </Box>
        </Box>
            
        </Modal>
        <Modal
            open= {postOpen}
            onClose={() => setPostOpen(false)}
            aria-labelledby="post-modal-title"
            aria-describedby="post-modal-description"
        >
        <Box sx={modalStyle}>
          <Typography id="post-modal-title" variant="h6" component="h2">
            Make a Post
          </Typography>
          <Box id="post-modal-description">
            <form id="post-form" onSubmit={handlePost}>
                <TextField label="Description" placeholder='Enter description' multiline rows={5} fullWidth onChange={(e) => setDescription(e.target.value)}></TextField>
                <Button
                    component="label"
                    variant="contained"
                    startIcon={<FileUploadIcon />}
                    href="#file-upload"
                    fullWidth
                    
                >
                    Upload a Picture
                <VisuallyHiddenInput type="file" accept='image/*' onChange={(e) => setPostImage(e.target.files[0])} />
                </Button>
                <Button fullWidth sx={{mt: 2}} variant='contained' type='submit' disabled={ postLoading }>Share</Button>
            </form>
          </Box>
        </Box>
            
        </Modal>
      </Box>
      <hr />
      <Posts posts= {user.posts.reverse()} />
    </Container>
  )
}

export default Profile
