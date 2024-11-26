"use client";

import React from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Link,
  Paper,
  IconButton,
} from "@mui/material";
import { useAuth } from "../contexts/SessionContext";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Alerts from "../components/alerts";
import axios from "axios";

export default function CreateAccount() {
  const { login, setGlobalCurrentUser } = useAuth(); // Accedemos a la función login del contexto
  var pass = false;
  const [newUser, setNewUser] = React.useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [open, setOpen] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showPassword2, setShowPassword2] = React.useState(false);
  const [alertConfig, setAlertConfig] = React.useState({
    severity: "",
    message: "",
  });
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowPassword2 = () => setShowPassword2((show) => !show);

  const handleUserInfo = (event) => {
    setNewUser({
      ...newUser,
      [event.target.name]: event.target.value,
    });
  };

  const createUserReq = async () => {
    try {
      newUser.type = "client"
      await axios.post("http://localhost:8005/api/v1/users", newUser).then( response => {
        if(response.data.status === "success"){
          setAlertConfig({
            severity: response.data.status,
            message: "Succesfully registered user",
          })
          pass = true
          setGlobalCurrentUser(response.data.New_user_created)
        }
      })
    } catch (error) {
      setAlertConfig({
        severity: "error",
        message: error.response.data.Error,
      })
    }
  }

  const isAUser = async () => {
    newUser.email !== "" &&
    newUser.password !== "" &&
    newUser.confirmPassword !== ""
      ? (
        newUser.password === newUser.confirmPassword ?
          await createUserReq()
        : setAlertConfig({
          severity: "error",
          message: "Passwords entered do not match",
        }))
      : setAlertConfig({
          severity: "error",
          message: "Please fill in the required fields",
        });

    login(pass, false);
    setOpen(true);
  };

  return (
    <Container
      maxWidth="xl"
      disableGutters
      sx={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 8,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 6,
          borderRadius: 2,
          maxWidth: "450px",
          width: "100%",
          my: 8,
        }}
      >
        <Typography
          component="h1"
          variant="h4"
          sx={{
            mb: 6,
            textAlign: "center",
            fontWeight: 500,
          }}
        >
          Create account
        </Typography>

        <Box
          sx={{
            "& .MuiTextField-root": { mb: 3 },
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
            value={newUser.email}
            onChange={handleUserInfo}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "grey.400",
                },
                "&:hover fieldset": {
                  borderColor: "grey.700",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "grey.700",
                },
              },
            }}
          />
          <Box>
            <TextField
              required
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="new-password"
              variant="outlined"
              value={newUser.password}
              onChange={handleUserInfo}
              sx={{
                width: "90%",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "grey.400",
                  },
                  "&:hover fieldset": {
                    borderColor: "grey.700",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "grey.700",
                  },
                },
              }}
            />
            <IconButton
              onClick={handleClickShowPassword}
              sx={{
                justifyContent: "center",
              }}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </Box>
          <Box>
            <TextField
              required
              name="confirmPassword"
              label="Confirm password"
              type={showPassword2 ? "text" : "password"}
              id="confirmPassword"
              autoComplete="new-password"
              variant="outlined"
              value={newUser.confirmPassword}
              onChange={handleUserInfo}
              sx={{
                width: "90%",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "grey.400",
                  },
                  "&:hover fieldset": {
                    borderColor: "grey.700",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "grey.700",
                  },
                },
              }}
            />
            <IconButton
              onClick={handleClickShowPassword2}
              sx={{
                justifyContent: "center",
              }}
              edge="end"
            >
              {showPassword2 ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              mb: 4,
              py: 1.5,
              bgcolor: "black",
              "&:hover": {
                bgcolor: "#333",
              },
              color: "white",
              textTransform: "none",
              fontSize: "1rem",
            }}
            onClick={() => isAUser()}
          >
            Login
          </Button>
          <Link
            href="/login"
            variant="body1"
            sx={{
              display: "block",
              textAlign: "center",
              color: "inherit",
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            Already have an account?
          </Link>
        </Box>
      </Paper>
      <Alerts open={open} setOpen={setOpen} alert={alertConfig} pos={"top"} />
    </Container>
  );
}
