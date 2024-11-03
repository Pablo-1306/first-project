"use client";

import { Box, Button, Container, Grid, IconButton, Typography} from "@mui/material";
import { useState } from "react";
import { initialCard } from "@/app/constants/payment/constants";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CardDialog from "@/app/components/card-dialog";

export default function paymentMethods(){

    const [cardList, setCardList] = useState(initialCard);
    const [action, setAction] = useState("");
    const [card, setCard] = useState({
        id: null,
        alias: "",
        name: "",
        number: "",
        month: "",
        year: "",
        cvv: ""
    })
    const deleteCard = (id) => setCardList(cardList.filter(card => card.id !== id))
    const handleCard = ({action, card}) => {
        setAction(action)
        setOpenCardDialog(true)

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
            setCard(card)
        }

    }

    const [openCardDialog, setOpenCardDialog] = useState(false);

    return(
        <Container maxWidth="xl" disableGutters>
            <Grid container sx={{display:'flex', justifyContent:'center', my:5}}>
                <Grid item>
                    <Typography variant='h4' sx={{mb:3}}>
                        Your Payments Methods
                    </Typography>
                    {cardList.map(card => (
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
                              onClick={() => handleCard({action: "edit", card: card})}
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
                        onClick={() => handleCard({action: "add"})}
                        sx={{ mt: 2, mb: 4, py: 1.5, bgcolor: '#000000', '&:hover': {
                        bgcolor: '#232222'},
                        color: 'white',
                        textTransform: 'none',
                        fontSize: '1rem'}}>
                        Add credit or debit card
                    </Button>
                </Grid>
            </Grid>
            <CardDialog
              open={openCardDialog}
              setOpen={setOpenCardDialog}
              action={action}
              card={card}
              setCard={setCard}
              cardList={cardList}
              setCardList={setCardList}
            />
        </Container>
    )
}