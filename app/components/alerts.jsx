import { Alert, Snackbar } from "@mui/material";

export default function Alerts({ open, setOpen, alert, pos }) {
  const handleClose = () => {
    setOpen(false);
  };
  var vertical;
  pos ? (vertical = pos) : (vertical = "bottom");

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: vertical, horizontal: "center" }}
    >
      <Alert onClose={handleClose} severity={alert.severity} variant="filled">
        {alert.message}
      </Alert>
    </Snackbar>
  );
}
