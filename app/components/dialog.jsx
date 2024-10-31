import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
  } from "@mui/material";
import { useState } from "react";
import AutoGrid from "./grid";
  
  export default function BookDialog({
    open,
    setOpen,
    action,
    title,
    reqs,
    requireSecondButton
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
        {typeof reqs[0] == 'string'?
          reqs.map((req) => (
            <TextField
            margin="dense"
            name={req}
            label={req}
            fullWidth
            value={''}
            />
          ))
          : 
          <AutoGrid requiredSpaces={reqs}/>
        }
        </DialogContent>
        <DialogActions>
          <Button sx={{color:'red'}} onClick={handleCloseDialog}>
            Cancel
          </Button>
          
          {requireSecondButton?
            <Button color="primary" >
              {title}
            </Button>
          : <></>
          }
          
        </DialogActions>
      </Dialog>
    );
  }
  