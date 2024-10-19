import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
  } from "@mui/material";
import { useState } from "react";
  
  export default function BookDialog({
    open,
    setOpen,
    action,
    title
  }) {

    const [value, setValue] = useState(action)
    const handleCloseDialog = () => {
      setOpen(false);
    };
  
    return (
      <Dialog
        open={open}
        onClose={handleCloseDialog}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>

          <TextField
            margin="dense"
            name="title"
            label="Title"
            fullWidth
            value={''}
          />
        </DialogContent>
        <DialogActions>
          <Button sx={{color:'red'}} onClick={handleCloseDialog}>
            Cancel
          </Button>
          <Button color="primary" >
            {value}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
  