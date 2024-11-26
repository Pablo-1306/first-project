"use client";

import {
  Box,
  Button,
  Container,
  IconButton,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { initialCard } from "@/app/constants/payment/constants";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CardDialog from "@/app/components/card-dialog";
import Alerts from "@/app/components/alerts";
import Grid from "@mui/material/Grid2";
import axios from "axios";

export default function PaymentMethods() {
  // State to open or close the alert
  const [openAlert, setOpenAlert] = useState(false);

  // Alert state to show messages to the user when adding a review or product to the cart
  const [alert, setAlert] = useState({
    message: "",
    severity: "",
  });

  const [cardList, setCardList] = useState([]);

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    try {
      const response = await axios.get("http://localhost:8004/api/v1/payments");
      setCardList(response.data);
    } catch (error) {
      console.error("Error fetching cards: ", error);
      setAlert({
        message: "Failed to fetch cards information",
        severity: "error",
      });
    }
    setOpenAlert(true);
  }

  const [action, setAction] = useState("");
  const [card, setCard] = useState({
    _id: null,
    alias: "",
    name: "",
    number: "",
    month: "",
    year: "",
    cvv: "",
  });
  const deleteCard = (_id) => {
    try {
      const response = axios.delete(`http://localhost:8004/api/v1/payments/${_id}`);
      setCardList(cardList.filter((c) => c._id !== _id));
      setAlert({
        message: "Card deleted succesfully",
        severity: "success",
      });
    }
    catch (error) {
      console.error("Error deleting card OMG: ", error);
      setAlert({
        message: "Failed to delete card",
        severity: "error",
      });
    }
    setOpenAlert(true);
  };
  const handleCard = ({ action, card }) => {
    setAction(action);
    setOpenCardDialog(true);

    if (action == "add") {
      setCard({
        id: null,
        alias: "",
        name: "",
        number: "",
        month: "",
        year: "",
        cvv: "",
      });
    } else if (action == "edit") {
      setCard(card);
    }
  };

  const [openCardDialog, setOpenCardDialog] = useState(false);

  return (
    <Container maxWidth="xl" disableGutters>
      <Grid container sx={{ display: "flex", justifyContent: "center", my: 5 }}>
        <Grid item>
          <Typography variant="h4" sx={{ mb: 3 }}>
            Your Payments Methods
          </Typography>
          {cardList.map((c) => (
            <Grid
              container
              justifyContent="space-between"
              sx={{ mb: 3 }}
              key={c._id}
            >
              <Box>
                <Typography variant="h5">{c.alias}</Typography>
                <Typography variant="p">
                  {c.name}
                  <br />
                  Termination {c.number.slice(-4)}
                  <br />
                  Expiration date {c.month}/{c.year}
                </Typography>
              </Box>
              <Box display="flex" flexDirection="column">
                <IconButton
                  color="secondary"
                  onClick={() => handleCard({ action: "edit", card: c })}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  color="secondary"
                  onClick={() => deleteCard(c._id)}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Grid>
          ))}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={() => handleCard({ action: "add" })}
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
          >
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
        setAlert={setAlert}
        setOpenAlert={setOpenAlert}
      />
      <Alerts open={openAlert} setOpen={setOpenAlert} alert={alert} />
    </Container>
  );
}
