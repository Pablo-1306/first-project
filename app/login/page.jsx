'use client';

import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Link,
  Paper
} from '@mui/material';

export default function LoginPage() {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

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
          Login
        </Typography>
        
        <Box 
          component="form" 
          noValidate 
          onSubmit={handleSubmit}
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
          <TextField
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            variant="outlined"
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
          >
            Login
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
    </Container>
  );
}
