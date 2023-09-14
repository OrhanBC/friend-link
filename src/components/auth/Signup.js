import { Container, TextField, Button, Typography, Link, Snackbar } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import React, { useState } from 'react'
import { LOGIN, DASHBOARD } from '../../lib/routes'
import { useSignup } from '../../hooks/auth'
import { useForm } from 'react-hook-form'
import { emailValidate, passwordValidate, usernameValidate } from '../../utils/form-validate'

const Signup = () => {
    const margin = {
        marginBottom: 1
      };
      const containerStyle = {
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '16px'
      };
      const [passwordError, setPasswordError] = useState(false);
      const [confirmPassword, setConfirmPassword] = useState("");
      const { signup, isLoading } = useSignup();
      const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
      async function handleSignup(data) {
        console.log(data.password);
        console.log(confirmPassword);
        if (confirmPassword !== data.password) {
            setPasswordError(true);
        } else {
            setPasswordError(false);
            signup({ username: data.username, email: data.email, password: data.password, redirectTo: DASHBOARD })
        }
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
                    Sign Up
                </Typography>
                <form onSubmit={handleSubmit(handleSignup)}>
                    <TextField 
                        label="Email" 
                        placeholder='Enter email' 
                        fullWidth 
                        sx={ margin }
                        error={ errors.email }
                        helperText= { errors.email && errors.email.message }
                        {...register("email", emailValidate)} />
                    <TextField 
                        label="Username" 
                        placeholder='Enter username' 
                        fullWidth 
                        sx={ margin }
                        error={ errors.username }
                        helperText={ errors.username && errors.username.message }
                        {...register("username", usernameValidate)} />
                    <TextField 
                        label="Password" 
                        placeholder='Enter password' 
                        type='password' 
                        fullWidth 
                        sx={ margin }
                        error={ errors.password }
                        helperText={ errors.password && errors.password.message }
                        {...register("password", passwordValidate)} />
                    <TextField 
                        label="Password" 
                        placeholder='Confirm Password' 
                        type='password' 
                        fullWidth 
                        sx={ margin }
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        error={ passwordError }
                        helperText={ passwordError && "Passwords do not match" }
                        />
                    <Button disabled={ isLoading } variant='contained' type='submit' fullWidth sx={ margin }>Sign Up</Button>
                </form>
                <Typography align='center' sx={ margin }>
                    Already have an account? {""}
                    <Link as={RouterLink} to={LOGIN}> Log in </Link>
                    instead!
                </Typography>
            
            
            </Container>
        </div>
        
      )
}

export default Signup
