"use client"
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { theme } from "../styles/global-theme";
import BookDialog from "./dialag";
import { useState } from "react";

export default function AppbarGlobal() {
  const navItems = [
    { label: "About us", href: "/" },
    { label: "Pricing", href: "/pricing" },
    { label: "Q&A", href: "/qa" },
  ];
  const loginNavItems = [
    { label: "Sign in", bc_color: theme.palette.primary.main },
    { label: "Sign up", bc_color: theme.palette.secondary.main},
  ];
  const [openDialog, setOpenDialog] = useState(false);
  const [action, setAction] = useState('')

  const handleClick = (item) => {
    setOpenDialog(true)
    setAction(item.label)
  }

  return (
    <AppBar position='sticky' sx={{ mb: 4}}>
      <Toolbar>
        <Image
            src="/logo.png"
            alt="Our Logo"
            height={40}
            width={40}
            priority
            
        />
        <Typography
          variant="h5"
          noWrap
          component={Link}
          href="/"
          sx={{
            display: { xs: "none", md: "flex" },
            fontFamily: "monospace",
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
              sx={{ color: "white", backgroundColor: item.bc_color}}
              onClick={() => handleClick(item)}
            >
              {item.label}
            </Button>
          ))}
        </Box>
      </Toolbar>
      <BookDialog
        open={openDialog}
        setOpen={setOpenDialog}
        action={action}
        title={action}
      />
    </AppBar>
  );
}
