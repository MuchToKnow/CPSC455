import {
  TextField,
  Box, Button, DialogContent
} from '@material-ui/core';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withFirebase } from '../Firebase';
import CircularProgress from '@material-ui/core/CircularProgress';

const ListingForm = (props) => {

  const useStyles = makeStyles((theme) => ({
    submitButton: {
      marginBottom: theme.spacing(2),
    },
    formControl: {
      marginBottom: theme.spacing(2),
    },
    availabilityText: {
      color: 'red',
      marginBottom: theme.spacing(2),
    },
    descriptionText: {
      marginBottom: theme.spacing(2),
    },
    textField: {
      marginBottom: theme.spacing(2),
    },
    form: {
      textAlign: 'center',
      margin: 'auto',
    }
  }));

  const classes = useStyles();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  // const handleStartDateChange = (date) => {
  //   setSelectedStartDate(date);
  // };
  //
  // const handleEndDateChange = (date) => {
  //   setSelectedEndDate(date);
  // };
  //
  // const handleImgChange = (event) => {
  //   setImageUrl(event.target.value);
  // };
  //
  // const handleCarAmountChange = (event) => {
  //   setCarAmount(event.target.value);
  // };
  //
  // const handleLocationChange = (event) => {
  //   setLocation(event.target.value);
  // };
  //
  // const handleParkingSizeChange = (event) => {
  //   setSizeOfParking(event.target.value);
  // };
  //
  // const handleTypeOfParkingChange = (event) => {
  //   setTypeOfParking(event.target.value);
  // };

  // const submit = () => {
  //   if (listingId) {
  //     onSubmit(listingId, selectedStartDate, selectedEndDate, imageUrl, carAmount, location, dailyRate, description, instructions, typeOfParking, sizeOfParking);
  //   } else {
  //     onSubmit(selectedStartDate, selectedEndDate, imageUrl, carAmount, location, dailyRate, description, instructions, typeOfParking, sizeOfParking);
  //   }
  // };

  const handleSubmit = (event) => {
    setIsLoading(true);
    if (props.firebase && props.firebase.firebasePasswordUpdate) {
      props.firebase.firebasePasswordUpdate(password).then(() => {
        setIsLoading(false);
        window.location.href = '/app';
      }).catch((err) => {
        alert("Error while setting user info." + err);
        setIsLoading(false);
      });
    }
  };

  return (
    <div className="CreateListingPage" >
      <Box boxShadow={3} className="booking">
        <h2>Edit User Info</h2>
        <form className={classes.form}>
          <DialogContent>
            <TextField
              className={classes.textField}
              id="firstName"
              label="First Name"
              name="lastName"
              variant="outlined"
              fullWidth
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
            />
            <TextField
              className={classes.textField}
              id="lastName"
              label="Last Name"
              name="lastName"
              variant="outlined"
              fullWidth
              value={lastName}
              onChange={e => setLastName(e.target.value)}
            />
            <TextField
              className={classes.textField}
              id="phoneNumber"
              label="Phone Number"
              name="phoneNumber"
              variant="outlined"
              fullWidth
              value={phoneNumber}
              onChange={e => setPhoneNumber(e.target.value)}
            />
            <TextField
              className={classes.textField}
              id="password"
              label="Current Password"
              name="password"
              type="password"
              variant="outlined"
              fullWidth
              value={currentPassword}
              onChange={e => setCurrentPassword(e.target.value)}
            />
            <TextField
              className={classes.textField}
              id="password"
              label="Password"
              name="password"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </DialogContent>
          {isLoading ? <CircularProgress /> :
            <Button onClick={handleSubmit} type="submit" variant="contained" color="secondary" className={classes.submitButton} fullWidth>
              Confirm Change User Info
            </Button>
          }
        </form>
      </Box>
    </div>
  );
};

export default withFirebase(ListingForm);
