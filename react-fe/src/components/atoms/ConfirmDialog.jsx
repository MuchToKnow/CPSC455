import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ButtonGroup } from '@material-ui/core';


// Adapted from: https://material-ui.com/components/dialogs/#alerts
export default function AlertDialog(props) {
  const { onConfirm, dialogText, actionNegative, actionPositive, buttonIcon } = props;
  const [open, setOpen] = React.useState(false);
  const [inProgress, setInProgress] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    setInProgress(true);
    onConfirm();
    handleClose();
  };

  return (
    <span>
      <Button onClick={handleClickOpen}>
        {buttonIcon}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle id="alert-dialog-title">{"Confirm"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {inProgress ? <CircularProgress color="secondary" /> :
            <ButtonGroup>
              <Button onClick={handleClose} color="tertiary">
                {actionNegative}
              </Button>
              <Button onClick={handleConfirm} variant="contained" color="secondary" autoFocus disableElevation>
                {actionPositive}
              </Button>
            </ButtonGroup>
          }
        </DialogActions>
      </Dialog>
    </span>
  );
}
