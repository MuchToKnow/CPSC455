import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import { useState } from 'react';
import { withFirebase } from '../Firebase';

const LoginForm = (props) => {
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

    const { open, setOpen } = props;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        props.firebase.firebaseSignInEmailAndPassword(email, password).then(() => {
            window.location.href = '/app';
        }).catch(() => {
            console.log('Login error')
        });
    };

    return (
        <div>
            <Dialog classes={{ paper: classes.dialogPaper }} open={open} onClose={handleClose}>
                <DialogTitle id="form-dialog-title" className={classes.dialogTitle}>Login</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
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
                        <TextField
                            required
                            margin="dense"
                            fullWidth
                            id="password"
                            label="Password"
                            name="password"
                            type="password"
                            variant="outlined"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button type="submit" className={classes.registerButton} fullWidth={true} variant="contained" disableElevation color="primary">
                            Login
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
};
export default withFirebase(LoginForm);
