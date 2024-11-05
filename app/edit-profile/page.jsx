'use client';

import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Link,
  Paper,
  useTheme
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import Alerts from '../components/alerts';
import { useAuth } from '../contexts/SessionContext';


export default function LoginPage() {

  const theme = useTheme();
  
  const { currentUser, users, setUsers, setGlobalCurrentUser, logout, adminUsers, setAdminUsers, removeUser} = useAuth();  // Accedemos a la función login del contexto
  var edited = false
  const [showPassword, setShowPassword] = React.useState(false);
  const [open, setOpen] = React.useState(false)
  const [editedUser, setEditedCurrentUser] = React.useState(currentUser);
  const [alertConfig, setAlertConfig] = React.useState({
    severity: '',
    message: ''
  })
  
  // Function to show or hide the password
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  // Function to show the input values the user is typing
  const handleUserInfo = (event) => {
    setEditedCurrentUser({
      ...editedUser,
      [event.target.name]: event.target.value,
    });
  };

  // Function to edit the user
  const editUser = () => {
    try {
        setUsers(users.map((user) => (user.email === currentUser.email ? (editedUser, edited = true) : user)));
        if(!edited){
            setAdminUsers(adminUsers.map((adminUser) => (adminUser.email === currentUser.email ? (editedUser, edited = true) : adminUser)));
        }
        setAlertConfig({
            severity: 'success',
            message: 'Profile edited'
        })
        
        setOpen(edited)
        if(edited)
            setGlobalCurrentUser(editedUser)
    } catch (error) {
        console.log(error)
    }
  }

  // Function to delete the user
  const deleteUser = () => {
    try {
        removeUser(currentUser)
        setAlertConfig({
        message: "Account deleted successfully",
        severity: "success",
        });
        setOpen(true);
        logout()
    } catch (error) {
        console.log(error)
    }
  }
 
  return (
    <Container 
      maxWidth="xl" 
      disableGutters 
      sx={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 8
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 6,
          borderRadius: 2,
          maxWidth: "450px",
          width: "100%",
          my: 8
        }}
      >
        <Typography 
          component="h1" 
          variant="h4" 
          sx={{ 
            mb: 6, 
            textAlign: 'center',
            fontWeight: 500
          }}
        >
            Edit profile
        </Typography>
        
        <Box
          sx={{
            '& .MuiTextField-root': { mb: 3 }
          }}
        >
          <TextField
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            variant="outlined"
            value={editedUser.email}
            onChange={handleUserInfo}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'grey.400',
                },
                '&:hover fieldset': {
                  borderColor: 'grey.700',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'grey.700',
                }
              },
              '& .MuiInputLabel-root': {
                color: 'grey.600',
                '&.Mui-focused': {
                  color: 'grey.700'
                }
              }
            }}
          />
          <Box>
            <TextField
              required
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              variant="outlined"
              value={editedUser.password}
              onChange={handleUserInfo}
              sx={{
                width: '90%',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'grey.400',
                  },
                  '&:hover fieldset': {
                    borderColor: 'grey.700',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'grey.700',
                  }
                },
                '& .MuiInputLabel-root': {
                  color: 'grey.600',
                  '&.Mui-focused': {
                    color: 'grey.700'
                  }
                }
              }}
            />
            <IconButton
              onClick={handleClickShowPassword}
              sx={{
                justifyContent:'center'
              }}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </Box>
          <Button component={Link} href='/sales/payment'
            sx={{
                backgroundColor: theme.palette.secondary.main,
                mr: 2
            }}
          >
            Payment Methods
          </Button>
          <Button 
            onClick={deleteUser}
            sx={{
                backgroundColor: 'red'
            }}
            href='/'
          >
            Erase Acount
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ 
              mt: 2,
              mb: 4,
              py: 1.5,
              bgcolor: '#000000',  
              '&:hover': {
                bgcolor: '#232222' 
              },
              color: 'white',
              textTransform: 'none',
              fontSize: '1rem'
            }}
            onClick={() => editUser()}
          >
            Edit
          </Button>
          <Link 
            href="#" 
            variant="body1" 
            sx={{ 
              display: 'block', 
              textAlign: 'center',
              color: 'primary.main',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline'
              }
            }}
          >
            Create account
          </Link>
        </Box>
      </Paper>
      <Alerts 
        open= {open}
        setOpen = {setOpen}
        alert={alertConfig} 
        pos={'top'}
      />
    </Container>
  );
}
