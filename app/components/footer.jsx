"use client"
import { AppBar, Box, Button, Divider, Switch, TextField, Toolbar, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Link from "next/link";
import Image from "next/image";
import { theme } from "../styles/global-theme";
import { AccountCircle } from "@mui/icons-material";

export default function FooterGlobal() {

  return (
    <AppBar position='static' sx={{backgroundColor:theme.palette.footer.main}}>
      <Toolbar >
        <Box >
          <Grid container spacing={30} width={'90%'} ml={'auto'} mr={'auto'}>
                <Grid size={{ xs: 12, sm: 6, md: 2 }} sx={{ mb: 4, mt:4, display:'flex'}}>
                    <Box sx={{display:'flex'}}>
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
                        sx={{
                            display: { xs: "none", md: "flex" },
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".05rem",
                            color: theme.palette.primary.main,
                            textDecoration: "none",
                            ml: 2
                        }}
                        >
                            EduTrack
                        </Typography>
                    </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 2 }} sx={{ mb: 4,mt:4, display:'flex'}}>
                    <Box>
                        <Typography
                        variant="h5"
                        color="black"
                        fontWeight={'bold'}
                        >
                            Company
                        </Typography>
                        <Typography
                        variant="h7"
                        color="black"
                        component={Link}
                        href="/about-us"
                        >
                            About Us
                        </Typography>
                    </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 2 }} sx={{ mb: 4,mt:4, display:'flex' }}>
                    <Box>
                        <Typography
                        variant="h5"
                        color="black"
                        fontWeight={'bold'}
                        >
                            Resources
                        </Typography>
                        <Box>
                        <Typography
                        variant="h7"
                        color="black"
                        component={Link}
                        href="/qa"
                        >
                            Comunnity Q&A
                        </Typography>
                        </Box>
                        <Typography
                        variant="h7"
                        color="black"
                        component={Link}
                        href="/pricing"
                        >
                            Pricing
                        </Typography>
                    </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 2 }} sx={{ mb: 4,mt:4, display:'flex' }}>
                    <Box>
                        <Typography
                        variant="h5"
                        color="black"
                        fontWeight={'bold'}
                        >
                            Contact
                        </Typography>
                        <Typography
                        variant="h7"
                        color="black"
                        component={Link}
                        href="/support"
                        >
                            Support
                        </Typography>
                    </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }} sx={{ mb: 4,mt:4, display:'flex' }}>
                    <Box>
                        <Typography
                        variant="h6"
                        color="black"
                        >
                            Subscribe to our newsletter
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                            <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField id="input-with-sx" label="Email" variant="standard" />
                            <Button sx={{ml:1, backgroundColor: theme.palette.primary.main}} color="white">Subscribe</Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
        
      </Toolbar>
      <Divider />
      <Box
          sx={{
            justifyContent: "center",
            display: "flex",
            mb: 2,
            mt: 1
          }}
        >
          <Typography variant="caption" color="white" >
            Copyright ©2024. PR_EduTrack Cookies Preferences
          </Typography>
          <Switch
            checked={true}
            // onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
            />
        </Box>
    </AppBar>
  );
}
