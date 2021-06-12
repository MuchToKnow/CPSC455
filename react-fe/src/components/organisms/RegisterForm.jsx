import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import { useState } from 'react';

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
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // send data to backend
        //     alert(firstName + lastName + email + password + phoneNumber);
        handleClose();
    };

    return (
        <div>
            <Button color="inherit" onClick={handleClickOpen}>Register</Button>
            <Dialog classes={{ paper: classes.dialogPaper }} open={open} onClose={handleClose}>
                <DialogTitle id="form-dialog-title" className={classes.dialogTitle}>Create New Account</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
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
                                            value={firstName}
                                            onChange={e => setFirstName(e.target.value)}
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
                                            value={lastName}
                                            onChange={e => setLastName(e.target.value)}
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
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
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
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
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
                                    value={phoneNumber}
                                    onChange={e => setPhoneNumber(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button type="submit" className={classes.registerButton} fullWidth={true} variant="outlined" color="primary">
                            Register
                </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
};
export default RegisterForm;
