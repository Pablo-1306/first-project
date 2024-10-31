"use client"
import { AppBar, Box, Button, Paper, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
import { theme } from "../styles/global-theme";
import BookDialog from "./dialog";
import { useState } from "react";
import PersonIcon from '@mui/icons-material/Person';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';

export default function AppbarGlobal() {
  
  const navItems = [
    { label: "About us", href: "/about-us" },
    { label: "Q&A", href: "/qa" },
  ];
  const loginNavItems = [
    { label: "Account", bc_color:theme.palette.secondary.main, icon: <PersonIcon/>},
  ];
  const AccountOptions = [
    {label: 'Sign In', icon: <PersonIcon sx={{width:'100px', height:'100px'}}/>, href: "/login"},
    {label: 'Sign Up', icon: <PersonAddAlt1Icon sx={{width:'100px', height:'100px'}}/>, href: "/qa"}
  ]

  const [openDialog, setOpenDialog] = useState(false);
  const [action, setAction] = useState('')
  const [reqs, setReqs] = useState([])
  const [requireSecondButton, setRequireSeccondButton] = useState('false')

  const card_config = {
    p: 4,
    textAlign: "center",
    "&:hover": {
    transform: "scale(1.05)",
    transition: "transform 0.4s ease-in-out",
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
    },
  }
  const button_conf = { 
    mt:3, 
    backgroundColor: theme.palette.primary.main, 
    color: 'grey', 
    borderRadius: 2, 
    "&:hover": {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.primary.main
    }
  }

  const handleClick = (item) => {
    setOpenDialog(true)
    setAction(item.label)
    if(item.label == 'Account'){
      setReqs([])
      var objs = []
      AccountOptions.forEach(option => {
        var new_obj = <Paper
          elevation={3}
          sx={card_config}
          >
            <Box display={'flex'} >
            {option.icon}
            </Box>
            <Button sx={button_conf} 
              component={Link}
              href={option.href}
              onClick={() => setOpenDialog(false)}
              >
              {option.label}
            </Button>
          </Paper>
          objs.push(new_obj)
        });
      
      setReqs(objs)
      setRequireSeccondButton(false)
    }
  }

  return (
    <AppBar position='sticky' sx={{ mb: 0}}>
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
            color: "inherit",
            textDecoration: "none",
            ml: 2
          }}
        >
          EduTrack
        </Typography>
        <Box sx={{ mr: "auto", ml: 2, display: "block" }}>
          {navItems.map((item) => (
            <Button
              key={item.label}
              component={Link}
              href={item.href}
              sx={{ color: "white" }}
            >
              {item.label}
            </Button>
          ))}
        </Box>
        <Box sx={{ ml: "auto", mr: 1, display: "block" }}>
          {loginNavItems.map((item) => (
            <Button
              key={item.label}
              sx={{ color: item.bc_color}}
              onClick={() => handleClick(item)}
            >
              {item.icon}
            </Button>
          ))}
        </Box>
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
