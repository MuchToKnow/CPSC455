import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import { useState } from 'react';
import { withFirebase } from '../Firebase';

const CreateListingPage = (props) => {
    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
        },
        createListingButton: {
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
    const [location, setLocation] = useState('');
    const [spots, setSpots] = useState(0);
    const [size, setSize] = useState('');
    const [price, setPrice] = useState(0);
    const [pictures, setPictures] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [availability, setAvailability] = useState('');

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // TODO: Post request to send info to backend database
        handleClose();
    };

    return (
        <div>
            <Dialog classes={{ paper: classes.dialogPaper }} open={open} onClose={handleClose}>
                <DialogTitle id="form-dialog-title" className={classes.dialogTitle}>Create Parking Listing</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <TextField
                            required
                            margin="dense"
                            id="location"
                            label="Location"
                            name="location"
                            variant="outlined"
                            value={location}
                            fullWidth
                            onChange={e => setLocation(e.target.value)}
                        />
                        <TextField
                            required
                            margin="dense"
                            id="spots"
                            label="Spots"
                            name="spots"
                            variant="outlined"
                            value={spots}
                            fullWidth
                            onChange={e => setSpots(e.target.valueAsNumber)}
                        />
                        <TextField
                            required
                            margin="dense"
                            fullWidth
                            id="size"
                            label="Size"
                            name="size"
                            variant="outlined"
                            value={size}
                            onChange={e => setSize(e.target.value)}
                        />
                        <TextField
                            required
                            margin="dense"
                            fullWidth
                            id="price"
                            label="Price"
                            name="price"
                            type="price"
                            variant="outlined"
                            value={price}
                            onChange={e => setPrice(e.target.valueAsNumber)}
                        />
                        <TextField
                            required
                            margin="dense"
                            fullWidth
                            id="pictures"
                            label="Pictures"
                            name="pictures"
                            type="pictures"
                            variant="outlined"
                            value={pictures}
                            onChange={e => setPictures(e.target.value)}
                        />
                        <TextField
                            required
                            margin="dense"
                            fullWidth
                            id="description"
                            label="Description"
                            name="description"
                            variant="outlined"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                        <TextField
                            required
                            margin="dense"
                            fullWidth
                            id="type"
                            label="Type"
                            name="type"
                            variant="outlined"
                            value={type}
                            onChange={e => setType(e.target.value)}
                        />
                        <TextField
                            required
                            margin="dense"
                            fullWidth
                            id="availability"
                            label="Availability"
                            name="availability"
                            variant="outlined"
                            value={availability}
                            onChange={e => setAvailability(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button type="submit" className={classes.createListingButton} fullWidth={true} variant="contained" disableElevation color="primary">
                            Create Listing
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
};
export default withFirebase(CreateListingPage);
