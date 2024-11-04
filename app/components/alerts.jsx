import { Alert, Snackbar } from "@mui/material";

export default function Alerts({ open, setOpen, alert, setAlert }) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert onClose={handleClose} severity={alert.severity} variant="filled">
        {alert.message}
      </Alert>
    </Snackbar>
  );
}