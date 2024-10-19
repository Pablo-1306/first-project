'use client'
import { Box, Button, Container, Paper, Slider, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { theme } from "../styles/global-theme";
import { enterprise_content, marks, personal_content, soulmate_content, team_content } from "../constants/constants";
import Image from "next/image";
import BookDialog from "../components/dialag";
import { useState } from "react";


export default function Pricing() {

    const card_config = {
        p: 4,
        textAlign: "center",
        "&:hover": {
        backgroundColor: theme.palette.lighter.main,
        transform: "scale(1.05)",
        transition: "transform 0.4s ease-in-out",
        boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
        },
    }
    const button_conf = { 
        mt:3, 
        backgroundColor: theme.palette.primary.main, 
        color: 'white', 
        borderRadius: 2, 
        "&:hover": {
            backgroundColor: 'white',
            color: theme.palette.primary.main
        }
    }
    
    const [openDialog, setOpenDialog] = useState(false);
    const [action, setAction] = useState('')

    const handleClick = (item) => {
        setOpenDialog(true)
        setAction(item.label)
    }

  return (
    <Container maxWidth="xl" disableGutters sx={{mb:5}}>
      <Paper
        sx={{
          padding: 2,
          borderRadius: 10,
          maxWidth: "90%",
          margin: "0 auto",
          justifyContent: "center",
          mb: 5
        }}
      >
            <Typography variant="h4" align="center" gutterBottom fontWeight={'bold'}>
            PRICING
            </Typography>
            <Typography variant="h6" align="center" gutterBottom>
            Tell us, how many projects do you have to implement microservices?
            </Typography>
        <Box sx={{ mt:5,  width: '35%', alignItems: "center", ml: 'auto', mr:'auto', mb: 2}}>
        <Slider
            aria-label="Always visible"
            defaultValue={5}
            min={1}
            step={1}
            max={10}
            marks={marks}
            valueLabelDisplay='auto'
            color="third"
        />
        </Box>
      </Paper>
        <Box>
            <Typography variant="h6" align="center" gutterBottom mb={4}>
            How many accounts do you require for the management of your microservices?
            </Typography>
            <Grid container spacing={4} alignItems="center" width={'90%'} ml={'auto'} mr={'auto'} >
                <Grid size={{ xs: 12, sm: 6, md: 3 }} sx={{ mb: 4 }}>
                    <Paper
                    elevation={3}
                    sx={card_config}
                    >
                        <Typography variant="h6" mb={2}>PERSONAL</Typography>
                        <Box display={'flex'}>
                            <Typography variant="h4" align="center" gutterBottom fontWeight={'bold'} >$10</Typography>
                            <Typography variant="h6" align="center" marginY={'center'} gutterBottom ml={1}>/microservice</Typography>
                        </Box>
                        {personal_content.map((item) => (
                            <Box display={'flex'}>
                            {item.icon}
                            <Typography variant="h6">{item.label}</Typography>
                            </Box>
                        ))}
                        <Button sx={button_conf} onClick={()=>handleClick({label:'Choose Plan'})}>
                            Choose plan
                        </Button>
                    </Paper>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }} sx={{ mb: 4 }}>
                    <Paper
                    elevation={3}
                    sx={card_config}
                    >
                        <Typography variant="h6" mb={2}>SOULMATE</Typography>
                        <Box display={'flex'}>
                            <Typography variant="h4" align="center" gutterBottom fontWeight={'bold'} >$17</Typography>
                            <Typography variant="h6" align="center" marginY={'center'} gutterBottom ml={1}>/microservice</Typography>
                        </Box>
                        {soulmate_content.map((item) => (
                            <Box display={'flex'}>
                            {item.icon}
                            <Typography variant="h6">{item.label}</Typography>
                            </Box>
                        ))}
                        <Button sx={button_conf} onClick={()=>handleClick({label:'Choose Plan'})}>
                            Choose plan
                        </Button>
                    </Paper>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }} sx={{ mb: 4 }}>
                    <Paper
                    elevation={3}
                    sx={card_config}
                    >
                        <Typography variant="h6" mb={2}>TEAM</Typography>
                        <Box display={'flex'}>
                            <Typography variant="h4" align="center" gutterBottom fontWeight={'bold'} >$80</Typography>
                            <Typography variant="h6" align="center" marginY={'center'} gutterBottom ml={1}>/microservice</Typography>
                        </Box>
                        {team_content.map((item) => (
                            <Box display={'flex'}>
                            {item.icon}
                            <Typography variant="h6">{item.label}</Typography>
                            </Box>
                        ))}
                        <Button sx={button_conf} onClick={()=>handleClick({label:'Choose Plan'})}>
                            Choose plan
                        </Button>
                    </Paper>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }} sx={{ mb: 4 }}>
                    <Paper
                    elevation={3}
                    sx={card_config}
                    >
                        <Typography variant="h6" mb={2}>ENTERPRISE</Typography>
                        <Box display={'flex'}>
                            <Typography variant="h4" align="center" gutterBottom fontWeight={'bold'} >$140</Typography>
                            <Typography variant="h6" align="center" marginY={'center'} gutterBottom ml={1}>/microservice</Typography>
                        </Box>
                        {enterprise_content.map((item) => (
                            <Box display={'flex'}>
                            {item.icon}
                            <Typography variant="h6">{item.label}</Typography>
                            </Box>
                        ))}
                        <Button sx={button_conf} onClick={()=>handleClick({label:'Choose Plan'})}>
                            Choose plan
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </Box>

        <Box sx={{alignContent:'center',  width: '90%',ml:'auto', mr:'auto', display:'flex', backgroundColor: theme.palette.cards.main}}>
            <Box>
                <Typography variant="h3" marginY={'10%'} marginX={'10%'} mb={2} color="white">Need help identifying the right plan for you?</Typography>
                <Button sx={{
                    width:'20%',
                    mt:'4%',
                    marginX:'10%',
                    backgroundColor: theme.palette.secondary.main, 
                    color: 'white', 
                    borderRadius: 2,
                    "&:hover": {
                        backgroundColor: 'white',
                        color: theme.palette.primary.main
                    }}}
                    onClick={()=>handleClick({label:'Contact'})}
                    >
                    Contact us
                </Button>
            </Box>
            <Image 
                src="/Designer.jpeg"
                alt="Support Image"
                height={400}
                width={400}
                priority
            />
            
        </Box>
        <BookDialog
        open={openDialog}
        setOpen={setOpenDialog}
        action={action}
        title={action}
      />
      </Container>
  );
}
