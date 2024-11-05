import { Alert, Snackbar } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';

export default function WaitingAlert({open, setOpen, alert, pos}) {
    const handleClose = () => {
        setOpen(false);
    }
    var vertical;
    pos ? vertical = pos : vertical = 'bottom'
    
    return (
        <Snackbar
            open={open}
            onClose={handleClose}
            anchorOrigin={{ vertical: vertical, horizontal: 'center' }}
        >
            <Alert onClose={handleClose} icon={<CircularProgress disableShrink />} variant="filled">
                {alert.message}
            </Alert>
        </Snackbar>
    )
}