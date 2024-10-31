"use client"

import { Box, Container, Typography, IconButton, useTheme, TextField } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Link from "next/link";
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

export default function FooterGlobal() {
    const theme = useTheme();

    return (
        <Container maxWidth='100vw' disableGutters
            sx={{
                backgroundColor: theme.palette.secondary.main,
                border: '1px solid white'
            }}
        >
            <Container maxWidth='md'>
                <Grid container >
                    
                    {/*LEFT COLUMN */}
                    <Grid size={{xs: 12, md: 6}} color={theme.palette.primary.main}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}
                    >
                        <Box
                            sx={{
                                mt: 6,
                                mb: {
                                    xs: 2,
                                    md: 6
                                },
                                textAlign: {
                                    xs: 'center',
                                    md: 'left'
                                }
                            }}
                        >
                            <Box display='flex'
                                sx={{
                                    mb: 3,
                                    display: 'flex',
                                    justifyContent: {
                                        xs: 'center',
                                        md: 'left'
                                    }
                                }}
                            >
                                <Typography component={Link} href='/about' color={theme.palette.primary.main}
                                    sx={{textDecoration: 'none'}}
                                >
                                    BRAND
                                </Typography>
                                <Typography component={Link} href='/contact' color={theme.palette.primary.main}
                                    sx={{ml: 5, textDecoration: 'none'}}
                                >
                                    CONTACT
                                </Typography>
                            </Box>
                            <Typography component={Link} href='/shipment' color={theme.palette.primary.main}
                                sx={{mb: 3, textDecoration: 'none', display: 'block'}}
                            >
                                SHIPPING AND CHANGES
                            </Typography>
                            <Typography component={Link} href='/faq' color={theme.palette.primary.main}
                                sx={{mb: 3, textDecoration: 'none', display: 'block'}}
                            >
                                FREQUENT ASKED QUESTIONS
                            </Typography >
                            <Typography component={Link} href='/terms' color={theme.palette.primary.main}
                                sx={{mb: 3, textDecoration: 'none', display: 'block'}}
                            >
                                TERMS AND CONDITIONS
                            </Typography>
                        </Box>
                    </Grid>
                    
                    {/*RIGHT COLUMN */}
                    <Grid size={{xs: 12, md: 6}} color={theme.palette.primary.main}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: {
                                xs: 'center',
                                md: 'end'
                            }
                        }}
                    >
                        <Box
                            sx={{
                                my: {
                                    xs: 4,
                                    md: 6
                                }
                            }}
                        >
                            <Typography
                                variant="h5"
                                noWrap
                                component={Link}
                                href="/"
                                sx={{
                                    fontFamily: "Grenze Gotisch",
                                    fontWeight: 600,
                                    letterSpacing: ".05rem",
                                    color: "inherit",
                                    textDecoration: "none",
                                }}
                            >
                                TiendaRopa
                            </Typography>

                            <Box sx={{mt: 1.5, width: 112}}>
                                <IconButton sx={{color: theme.palette.primary.main, p: 0, mr: 2, ml: 1}}>
                                    <TwitterIcon/>
                                </IconButton>
                                <IconButton sx={{color: theme.palette.primary.main, p: 0, mr: 2}}>
                                    <InstagramIcon />
                                </IconButton>
                                <IconButton sx={{color: theme.palette.primary.main, p: 0}}>
                                    <FacebookIcon />
                                </IconButton>
                            </Box>
                        </Box>

                        <Box
                            sx={{
                                mb: {
                                    xs: 6,
                                    md: 0
                                }
                            }}
                        >
                            <Typography variant="subtitle2"
                                sx={{
                                    fontSize: 10,
                                    textAlign: {
                                        md: 'right',
                                        xs: 'center'
                                    }
                                }}
                            >
                                Receive news from TiendaRopa
                            </Typography>
                            <TextField 
                                placeholder="Your email"
                                variant="standard"
                                size="small"
                                
                                sx={{
                                    border: '1px solid white',
                                    '& .MuiInputBase-input': { //Placeholder text
                                        color: 'white',
                                        textAlign: {
                                            xs: 'center',
                                            md: 'right'
                                        } 
                                    },
                                }}
                            />
                        </Box>
                    </Grid>

                </Grid>

            </Container>
        </Container>
    );
}
