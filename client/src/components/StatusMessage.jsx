import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const StatusMessage = ({ message, status }) => {
  const [open, setOpen] = React.useState(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Snackbar
        open={status}
        autoHideDuration={6000}
        onClose={() => {
          setOpen(false);
        }}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default StatusMessage;
