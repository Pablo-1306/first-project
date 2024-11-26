import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
} from "@mui/material";
import axios from "axios";

export default function CardDialog({
  open,
  setOpen,
  action,
  card,
  setCard,
  cardList,
  setCardList,
  setAlert,
  setOpenAlert,
}) {
  const closeDialog = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setCard({
      ...card,
      [event.target.name]: event.target.value,
    });
  };

  const saveCard = async () => {
    if (action == "add") {
      try {
        const response = await axios.post("http://localhost:8004/api/v1/payments", card);
        response.data._id = cardList.length + 1;
        setCardList([...cardList, response.data]);
        setAlert({
          message: "Card added successfully",
          severity: "success",
        });
      }
      catch (error) {
        console.error("Error adding card: ", error);
        setAlert({
          message: "Failed to add card",
          severity: "error",
        });
      }
    } else if (action == "edit") {
      try {
        const response = await axios.put(`http://localhost:8004/api/v1/payments/${card._id}`, card);
        setCardList(
          cardList.map((c) => (c._id === card._id ? response.data : c)),
        );
        setAlert({
          message: "Card edited successfully",
          severity: "success",
        });
      }
      catch (error) {
        console.error("Error editing card: ", error);
        setAlert({
          message: "Failed to edit card",
          severity: "error",
        });
      }
    }
    setOpenAlert(true);
    closeDialog();
  };

  return (
    <Dialog open={open} onClose={closeDialog}>
      <DialogTitle>{action === "add" ? "Add card" : "Edit card"}</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          name="alias"
          label="Alias"
          fullWidth
          value={card.alias}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="name"
          label="Cardholder Name"
          type="text"
          fullWidth
          value={card.name}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="number"
          label="Card Number"
          type="text"
          fullWidth
          value={card.number}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="cvv"
          label="CVV"
          type="text"
          fullWidth
          value={card.cvv}
          onChange={handleChange}
        />
        <Box display="flex" gap={2}>
          <TextField
            margin="dense"
            name="month"
            label="Expiration Month"
            type="text"
            fullWidth
            value={card.month}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="year"
            label="Expiration Year"
            type="text"
            fullWidth
            value={card.year}
            onChange={handleChange}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button color="secondary" onClick={closeDialog}>
          Cancel
        </Button>
        <Button color="secondary" onClick={saveCard}>
          {action === "add" ? "Add" : "Edit"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
