"use client";

import { Box, Button, Card, CardContent, Container, Grid, IconButton, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { initialCard } from "@/app/constants/payment/constants";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function paymentMethods(){

    const handleCard = ({action, card}) => {
        setAction(action);
        {/* Aqui abrir el dialogo */};

        if (action == "add"){
            setCard({
              id: null,
              alias: "",
              name: "",
              number: "",
              month: "",
              year: "",
              cvv: ""
            });
          } else if (action == "edit"){
            setCard(book);
          }
    }
    const [card, setCard] = useState(initialCard);
    const deleteCard = (id) => setCard(card.filter(card => card.id !== id))
    const [action, setAction]  = useState("");
    const [openCardDialog, setOpenCardDialog] = useState(false);

    return(
        <Container maxWidth="xl" disableGutters>
            <Grid container sx={{display:'flex', justifyContent:'center', my:5}}>
                <Grid item>
                    <Typography variant='h4' sx={{mb:3}}>
                        Your Payments Methods
                    </Typography>
                    {card.map(card => (
                      <Grid container justifyContent="space-between" sx={{mb:3}}>
                        <Box>
                          <Typography variant="h5">
                              {card.alias}
                          </Typography>
                          <Typography variant="p">
                              {card.name}
                              <br/>
                              Termination {card.number.slice(-4)}
                              <br/>
                              Expiration date {card.month}/{card.year}
                          </Typography>
                        </Box>
                        <Box display="flex" flexDirection="column">
                          <IconButton
                              color="secondary"
                          >
                              <EditIcon/>
                          </IconButton>
                          <IconButton
                              color="secondary"
                              onClick={() => deleteCard(card.id)}
                          >
                              <DeleteIcon/>
                          </IconButton>
                        </Box>
                      </Grid>
                    ))}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        onClick={() => handleCard({ action: "add" })}
                        sx={{ mt: 2, mb: 4, py: 1.5, bgcolor: '#000000', '&:hover': {
                        bgcolor: '#232222'},
                        color: 'white',
                        textTransform: 'none',
                        fontSize: '1rem'}}>
                        Add credit or debit card
                    </Button>
                </Grid>
            </Grid>
        </Container>
    )
}