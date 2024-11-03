import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Box
  } from "@mui/material";
  
  export default function CardDialog({
    open,
    setOpen,
    action,
    card,
    setCard,
    cardList,
    setCardList
  }) {

    const closeDialog = () => {
        setOpen(false)
    }

    const handleChange = (event) => {
        setCard({
            ...card,
            [event.target.name]: event.target.value,
        });
    }

    const saveCard = () => {
        if (action == "add"){
            card.id = cardList.length + 1;
            setCardList([...cardList, card])
        } else if (action == "edit"){
            setCardList(cardList.map(newCard => newCard.id === card.id ? card : newCard))
        }
        closeDialog()
    };

    return (
      <Dialog 
        open={open}
        onClose={closeDialog}
        >
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
        <Button color="secondary" 
          onClick={closeDialog}>
          Cancel
        </Button>
        <Button color="secondary" 
          onClick={saveCard}>
          {action === "add" ? "Add" : "Edit"}
        </Button>
      </DialogActions>
      </Dialog>
    );
  }
  