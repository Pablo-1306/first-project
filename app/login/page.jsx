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
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import {
  registered_admin_users,
  registered_users,
} from "../constants/users/constants";
import Alerts from "../components/alerts";
import { useAuth } from "../contexts/SessionContext";

export default function LoginPage() {
  const { login, setGlobalCurrentUser } = useAuth(); // Accedemos a la función login del contexto
  var userInfo;
  var pass = false;
  var isAdmin = false;
  const [showPassword, setShowPassword] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({
    email: "",
    password: "",
  });
  const [alertConfig, setAlertConfig] = React.useState({
    severity: "",
    message: "",
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleUserInfo = (event) => {
    setCurrentUser({
      ...currentUser,
      [event.target.name]: event.target.value,
    });
  };

  const isAUser = () => {
    currentUser.email !== "" && currentUser.password !== ""
      ? ((userInfo = registered_admin_users.find(
          ({ email }) => email === currentUser.email,
        )),
        userInfo !== undefined
          ? currentUser.password === userInfo.password
            ? (setAlertConfig({
                severity: "success",
                message: `Right credentials, welcome ${currentUser.email}`,
              }),
              (pass = true),
              (isAdmin = true),
              setGlobalCurrentUser(currentUser))
            : setAlertConfig({
                severity: "error",
                message: "Please verify the data entered (email and password).",
              })
          : ((userInfo = registered_users.find(
              ({ email }) => email === currentUser.email,
            )),
            userInfo !== undefined
              ? currentUser.password === userInfo.password
                ? (setAlertConfig({
                    severity: "success",
                    message: `Welcome ${currentUser.email}`,
                  }),
                  (pass = true),
                  setGlobalCurrentUser(currentUser))
                : setAlertConfig({
                    severity: "error",
                    message:
                      "Please verify the data entered (email and password).",
                  })
              : setAlertConfig({
                  severity: "error",
                  message: "No user with the entered data was found.",
                })))
      : setAlertConfig({
          severity: "error",
          message: "Please fill in the required fields",
        });

    login(pass, isAdmin);
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
          Login
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
            value={currentUser.email}
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
              "& .MuiInputLabel-root": {
                color: "grey.600",
                "&.Mui-focused": {
                  color: "grey.700",
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
              autoComplete="current-password"
              variant="outlined"
              value={currentUser.password}
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
                "& .MuiInputLabel-root": {
                  color: "grey.600",
                  "&.Mui-focused": {
                    color: "grey.700",
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              mb: 4,
              py: 1.5,
              bgcolor: "#000000",
              "&:hover": {
                bgcolor: "#232222",
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
            href="#"
            variant="body1"
            sx={{
              display: "block",
              textAlign: "center",
              color: "primary.main",
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            Create account
          </Link>
        </Box>
      </Paper>
      <Alerts open={open} setOpen={setOpen} alert={alertConfig} pos={"top"} />
    </Container>
  );
}
