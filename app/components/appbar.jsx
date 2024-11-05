"use client";
import {
  AppBar,
  Box,
  Button,
  Paper,
  Toolbar,
  Typography,
  Dialog,
} from "@mui/material";
import Link from "next/link";
import { theme } from "../styles/global-theme";
import BookDialog from "./dialog";
import { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import CartView from "./cart-view";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useAuth } from "../contexts/SessionContext";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";

export default function AppbarGlobal() {
  const { isAdminUser, isAuthenticated, logout, setGlobalCurrentUser } =
    useAuth();

  const AdminNavItems = [
    { label: "About us", href: "/about-us" },
    { label: "Q&A", href: "/qa" },
    { label: "Admin", href: "/admin/categories" },
  ];
  const navItems = [
    { label: "About us", href: "/about-us" },
    { label: "Q&A", href: "/qa" },
  ];
  const loginNavItems = [{ label: "Account", icon: <PersonIcon /> }];
  const AccountOptions = [
    {
      label: "Sign In",
      icon: <PersonIcon sx={{ width: "100px", height: "100px" }} />,
      href: "/login",
    },
    {
      label: "Sign Up",
      icon: <PersonAddAlt1Icon sx={{ width: "100px", height: "100px" }} />,
      href: "/register",
    },
  ];
  const LogedOptions = [
    {
      label: "Edit",
      icon: <EditIcon sx={{ width: "100px", height: "100px" }} />,
      href: "/edit-profile",
    },
    {
      label: "Logout",
      icon: <LogoutIcon sx={{ width: "100px", height: "100px" }} />,
      href: "/",
    },
  ];

  const [openDialog, setOpenDialog] = useState(false);
  const [action, setAction] = useState("");
  const [reqs, setReqs] = useState([]);
  const [requireSecondButton, setRequireSeccondButton] = useState("false");

  // Cart constants
  const cartItems = [{ label: "Shopping Cart", icon: <ShoppingCartIcon /> }];
  const [openCart, setOpenCart] = useState(false);
  const handleOpenCart = () => setOpenCart(true);
  const handleCloseCart = () => setOpenCart(false);

  const card_config = {
    p: 4,
    textAlign: "center",
    "&:hover": {
      transform: "scale(1.05)",
      transition: "transform 0.4s ease-in-out",
      boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
    },
  };
  const button_conf = {
    mt: 3,
    backgroundColor: theme.palette.primary.main,
    color: "grey",
    borderRadius: 2,
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.primary.main,
    },
  };

  const handleClick = (item) => {
    setOpenDialog(true);
    setAction(item.label);
    if (item.label == "Account") {
      setReqs([]);
      var objs = [];
      var options = [];
      isAuthenticated == false
        ? (options = AccountOptions)
        : (options = LogedOptions);

      options.forEach((option) => {
        var new_obj = (
          <Paper elevation={3} sx={card_config}>
            <Box display={"flex"}>{option.icon}</Box>
            <Button
              sx={button_conf}
              component={Link}
              href={option.href}
              onClick={() => {
                try {
                  setOpenDialog(false);
                  if (option.label == "Logout") {
                    logout();
                    setGlobalCurrentUser("");
                  }
                } catch (error) {
                  console.log(error);
                }
              }}
            >
              {option.label}
            </Button>
          </Paper>
        );
        objs.push(new_obj);
      });

      setReqs(objs);
      setRequireSeccondButton(false);
    }
  };

  return (
    <AppBar
      position="sticky"
      sx={{ mb: 0, bgcolor: theme.palette.secondary.main }}
    >
      <Toolbar>
        <Typography
          variant="h5"
          noWrap
          component={Link}
          href="/"
          sx={{
            display: { xs: "none", md: "flex" },
            fontFamily: "Grenze Gotisch",
            fontWeight: 700,
            letterSpacing: ".05rem",
            color: theme.palette.primary.main,
            textDecoration: "none",
            ml: 2,
          }}
        >
          Atemporal
        </Typography>

        <Box sx={{ mr: 1, ml: 3, display: "block" }}>
          {isAdminUser
            ? AdminNavItems.map((item) => (
                <Button
                  key={item.label}
                  component={Link}
                  href={item.href}
                  sx={{ color: theme.palette.primary.main }}
                >
                  {item.label}
                </Button>
              ))
            : navItems.map((item) => (
                <Button
                  key={item.label}
                  component={Link}
                  href={item.href}
                  sx={{ color: theme.palette.primary.main }}
                >
                  {item.label}
                </Button>
              ))}
        </Box>

        <Box sx={{ ml: "auto", display: "flex", alignItems: "center" }}>
          {/* SHOPPING CART BUTTON */}
          {cartItems.map((item) => (
            <Button
              key={item.label}
              sx={{ color: theme.palette.primary.main }}
              onClick={handleOpenCart}
            >
              {item.icon}
            </Button>
          ))}

          {/* ACCOUNT BUTTON */}
          {loginNavItems.map((item) => (
            <Button
              key={item.label}
              sx={{ color: theme.palette.primary.main }}
              onClick={() => handleClick(item)}
            >
              {item.icon}
            </Button>
          ))}
        </Box>

        {/* SHOPPING CART DIALOG */}
        <Dialog
          open={openCart}
          onClose={handleCloseCart}
          fullWidth
          maxWidth="sm"
        >
          <CartView />
        </Dialog>
      </Toolbar>
      <BookDialog
        open={openDialog}
        setOpen={setOpenDialog}
        action={action}
        title={action}
        reqs={reqs}
        requireButton={requireSecondButton}
      />
    </AppBar>
  );
}
