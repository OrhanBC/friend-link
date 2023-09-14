import { Container, TextField, Button, Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import React from 'react';
import { DASHBOARD, SIGNUP } from '../../lib/routes';
import { useLogin } from '../../hooks/auth';
import { useForm } from 'react-hook-form';
import { emailValidate, passwordValidate } from '../../utils/form-validate';

const Login = () => {
  const margin = {
    marginBottom: 1
  };
  const containerStyle = {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '16px'
  };
  const { login, isLoading } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  async function handleLogin(data) {
    login({ email: data.email, password: data.password, redirectTo: DASHBOARD });
  }
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
        <Container maxWidth="sm" sx={ containerStyle }>
        <Typography variant='h4' align='center' sx={{fontFamily: 'Concert One, cursive', margin: 4}}>FriendLink</Typography>
            <Typography variant="h5" align='center' sx={ margin }>
                Log In
            </Typography>
            <form onSubmit={handleSubmit(handleLogin)}>
                <TextField
                    label="Email" 
                    placeholder='Enter email' 
                    fullWidth 
                    sx={ margin }
                    error={ errors.email }
                    helperText={ errors.email && errors.email.message }
                    {...register("email", emailValidate)} />
                <TextField 
                    label="Password" 
                    placeholder='Enter password' 
                    type='password' 
                    fullWidth 
                    sx={ margin }
                    error={ errors.password }
                    helperText={ errors.password && errors.password.message } 
                    {...register("password", passwordValidate)} />
                <Button disabled={ isLoading } variant='contained' type='submit' fullWidth sx={ margin }>Log In</Button>
            </form>
            <Typography align='center' sx={ margin }>
                Don't have an account? {""}
                <Link as={RouterLink} to={SIGNUP}> Sign up </Link>
                instead!
            </Typography>
        
        
        </Container>
    </div>
    
  )
}

export default Login
