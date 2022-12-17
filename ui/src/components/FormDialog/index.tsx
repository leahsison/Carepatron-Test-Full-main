
import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";

import CloseIcon from "@mui/icons-material/Close";
import FormStepper from "../FormStepper";

type Props = {
  clientDetails: IClient;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClose: () => void;
  open: boolean;
}

function FormDialog({ clientDetails, handleChange, handleClose, open }: Props) {
  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>
        Create new client
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <FormStepper clientDetails={clientDetails} handleChange={handleChange} handleClose={handleClose} />
      </DialogContent>
    </Dialog>
  )
}

export default FormDialog;