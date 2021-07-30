import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {
  TextField,
  Box,
  Grid, FormControl, InputLabel, Select, MenuItem, Button
} from '@material-ui/core';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const ListingForm = (props) => {
  const { onSubmit, startDate, endDate, imgUrl, carAmt, locn, dRate, instr, descr, parkingType, parkingSize, listingId } = props;

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
    }
  }));

  const classes = useStyles();

  const [selectedStartDate, setSelectedStartDate] = useState(startDate ? new Date(startDate) : new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(endDate ? new Date(endDate) : new Date());
  const [imageUrl, setImageUrl] = useState(imgUrl ? imgUrl : '');
  const [carAmount, setCarAmount] = useState(carAmt ? carAmt : '');
  const [location, setLocation] = useState(locn ? locn : '');
  const [dailyRate, setDailyRate] = useState(dRate ? dRate : '');
  const [description, setDescription] = useState(descr ? descr : '');
  const [instructions, setInstructions] = useState(instr ? instr : '');
  const [typeOfParking, setTypeOfParking] = useState(parkingType ? parkingType : '');
  const [sizeOfParking, setSizeOfParking] = useState(parkingSize ? parkingSize : '');


  const handleStartDateChange = (date) => {
    setSelectedStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
  };

  const handleImgChange = (event) => {
    setImageUrl(event.target.value);
  };

  const handleCarAmountChange = (event) => {
    setCarAmount(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleParkingSizeChange = (event) => {
    setSizeOfParking(event.target.value);
  };

  const handleTypeOfParkingChange = (event) => {
    setTypeOfParking(event.target.value);
  };

  const submit = () => {
    if (listingId) {
      onSubmit(listingId, selectedStartDate, selectedEndDate, imageUrl, carAmount, location, dailyRate, description, instructions, typeOfParking, sizeOfParking);
    } else {
      onSubmit(selectedStartDate, selectedEndDate, imageUrl, carAmount, location, dailyRate, description, instructions, typeOfParking, sizeOfParking);
    }
  };

  return (
    <div className="CreateListingPage" >
      <Box boxShadow={3} className="booking">
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify="space-around">
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Start Date"
              value={selectedStartDate}
              onChange={handleStartDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change start date',
              }}
            />
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="End Date"
              value={selectedEndDate}
              onChange={handleEndDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change end date',
              }}
            />
          </Grid>

        </MuiPickersUtilsProvider>
        <FormControl className={classes.formControl} fullWidth>
          <InputLabel id="carAmount">Number of Cars</InputLabel>
          <Select
            labelId="carAmount"
            id="carAmount"
            value={carAmount}
            onChange={handleCarAmountChange}
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
          </Select>
        </FormControl>
        <TextField
          className={classes.textField}
          required
          id="imgUrl"
          label="Image Url"
          name="imgUrl"
          variant="outlined"
          value={imageUrl}
          fullWidth
          onChange={handleImgChange}
        />
        <TextField
          className={classes.textField}
          required
          id="location"
          label="Location"
          name="location"
          variant="outlined"
          value={location}
          fullWidth
          onChange={handleLocationChange}
        />
        <TextField
          className={classes.textField}
          required
          id="dailyRate"
          label="Daily Rate"
          name="dailyRate"
          variant="outlined"
          value={dailyRate}
          fullWidth
          onChange={e => setDailyRate(e.target.value)}
        />
        <TextField
          className={classes.textField}
          required
          id="description"
          label="Description"
          name="description"
          variant="outlined"
          value={description}
          fullWidth
          onChange={e => setDescription(e.target.value)}
        />
        <TextField
          className={classes.textField}
          required
          id="instructions"
          label="Instructions For Use"
          name="instructions"
          variant="outlined"
          value={instructions}
          fullWidth
          onChange={e => setInstructions(e.target.value)}
        />
        <FormControl className={classes.formControl} fullWidth>
          <InputLabel id="parkingSize">Size</InputLabel>
          <Select
            labelId="parkingSize"
            id="parkingSize"
            value={sizeOfParking}
            onChange={handleParkingSizeChange}
          >
            <MenuItem value={'Small'}>Small</MenuItem>
            <MenuItem value={'Medium'}>Medium</MenuItem>
            <MenuItem value={'Large'}>Large</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={classes.formControl} fullWidth>
          <InputLabel id="typeOfParking">Outdoor or Indoor</InputLabel>
          <Select
            labelId="typeOfParking"
            id="typeOfParking"
            value={typeOfParking}
            onChange={handleTypeOfParkingChange}
          >
            <MenuItem value={'Indoor'}>Indoor</MenuItem>
            <MenuItem value={'Outdoor'}>Outdoor</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" color="secondary" className={classes.submitButton} fullWidth onClick={submit}>
          {listingId ? "Update Parking Listing!" : "Create Parking Listing!"}
        </Button>
      </Box>
    </div>
  );
};

export default ListingForm;
