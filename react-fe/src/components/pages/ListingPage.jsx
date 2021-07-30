import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../../styling/ListingPage.css';
import Header from '../organisms/Header';
import FeatureList from '../organisms/FeatureList';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Box, Typography, Grid, FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import axios from "axios";
import config from "../../config";
import { Constants } from "../Constants";
import { withFirebase } from '../Firebase';
import PropTypes from "prop-types";

function ListingPage(props) {
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
    }
  }));

  const classes = useStyles();
  const [minDate, setMinDate] = useState(new Date());
  const [maxDate, setMaxDate] = useState(new Date());
  const [selectedStartDate, setSelectedStartDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(new Date());
  const [carAmount, setCarAmount] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [size, setSize] = useState('');
  const [location, setLocation] = useState(null);
  const [numberAvail, setNumberAvail] = useState(null);
  const [dayPrice, setDayPrice] = useState(null);
  const [description, setDescription] = useState(null);
  const [authUserHeaders, setAuthUserHeaders] = useState(null);
  const url = config.api.url;
  const { listingId } = useParams();

  const handleStartDateChange = (date) => {
    setSelectedStartDate(date);
  };
  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
  };
  const handleCarAmountChange = (event) => {
    setCarAmount(event.target.value);
  };

  const responseToListing = (resp) => {
    setImgUrl(resp.imgUrl);
    setSize(resp.size);
    setLocation(resp.location);
    setNumberAvail(resp.numberAvail);
    setDayPrice(resp.dayPrice);
    setDescription(resp.description);
    setMinDate(new Date(resp.startDate));
    setMaxDate(new Date(resp.endDate));
  };

  useEffect(() => {
    axios.get(url + "/listings/single/" + listingId).then((resp) => responseToListing(resp.data)).catch(e => console.log(e));
  }, [url, listingId]);

  const setAuthHeaders = () => {
    if (props.firebase.getAuthHeaders()) {
      setAuthUserHeaders(props.firebase.getAuthHeaders());
    } else {
      setTimeout(setAuthHeaders, 100);
    }
  };

  useEffect(setAuthHeaders, []);

  const onReserve = () => {
    axios.post(url + "/bookings", {
      startDate: selectedStartDate,
      endDate: selectedEndDate,
      listingId,
      carAmount
    }, authUserHeaders).then((resp) => {
      alert("Booking created successfully");
    }).catch((err) => {
      alert("Server error - failed to create booking: " + err);
    });
  };

  const menuList = [];
  for (let i = 1; i <= numberAvail; i++) {
    menuList.push(
      <MenuItem value={i}>{String(i)}</MenuItem>
    );
  }

  return (
    <div>
      <Header />
      <div className="ListingPage" >
        <Typography variant="h5" className="banner_text">{location}</Typography>
        <img src={imgUrl} alt={Constants.imgAlt.userParking} />
        <div className="belowImgContainer">
          <div className="descriptions">
            <Typography variant="h6" className={classes.availabilityText}>{numberAvail} spot(s) available - {size}</Typography>
            <Typography variant="h6" className={classes.availabilityText}>${dayPrice}/day</Typography>
            <Typography variant="h6" className={classes.descriptionText}>{description}</Typography>
            <FeatureList />
          </div>
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
                  minDate={minDate}
                  maxDate={maxDate}
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
                  minDate={minDate}
                  maxDate={maxDate}
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
                {menuList}
              </Select>
            </FormControl>
            <Button onClick={onReserve} variant="contained" color="secondary" className={classes.submitButton} fullWidth>
              Reserve
            </Button>
          </Box>
        </div>
      </div>
    </div >
  );
}

ListingPage.propTypes = {
  imgUrl: PropTypes.string,
  size: PropTypes.string,
  location: PropTypes.string,
  numberAvail: PropTypes.number,
  dayPrice: PropTypes.number,
  hourPrice: PropTypes.number,
};

export default withFirebase(ListingPage);
