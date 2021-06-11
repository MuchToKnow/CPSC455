import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import { useState } from 'react';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const RegisterForm = () => {
  const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    registerButton: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        marginBottom: theme.spacing(4),
    },
    dialogPaper: {
        minHeight: '47vh',
        maxHeight: '47vh',
        minWidth: '50vh',
        maxWidth: '50vh',
    },
    dialogTitle: {
        marginTop: theme.spacing(4),
        textAlign: 'center',
    }
  }));

  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
        <Button color="inherit" onClick={handleClickOpen}>Register</Button>
        <Dialog classes={{ paper: classes.dialogPaper}} open={open} onClose={handleClose}>
            <DialogTitle id="form-dialog-title" className={classes.dialogTitle}>Create New Account</DialogTitle>
            <DialogContent>
            <form>
            <Grid container direction={"column"} spacing={2}>
            <Grid item>
            <Grid container direction={"row"} spacing={6}>
            <Grid item>
            <TextField
                required
                margin="dense"
                id="firstName"
                label="First Name"
                name="firstName"
                variant="outlined"
            />
            </Grid>
            <Grid item>
            <TextField
                required
                margin="dense"
                id="lastName"
                label="Last Name"
                name="lastName"
                variant="outlined"
            />
            </Grid>
            </Grid>
            </Grid>
            <Grid item>
            <TextField
                required
                margin="dense"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                variant="outlined"
            />
            </Grid>
            <Grid item>
                <TextField
                    required
                    margin="dense"
                    fullWidth
                    id="password"
                    label="Password"
                    name="password"
                    variant="outlined"
                />
            </Grid>
            <Grid item>
            <TextField
                required
                margin="dense"
                fullWidth
                id="phoneNumber"
                label="Phone Number"
                name="phoneNumber"
                variant="outlined"
            />
            </Grid>
            </Grid>
            </form>
            </DialogContent>
            <DialogActions>
                <Button className={classes.registerButton} fullWidth={true} onClick={handleClose} variant="outlined" variant="contained" color="primary" mb="100">
                    Register
                </Button>
            </DialogActions>
        </Dialog>
    </div>
  );
};
export default RegisterForm;