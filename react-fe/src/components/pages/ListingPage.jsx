import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import '../../styling/ListingPage.css';
import Header from '../organisms/Header';
import UserAvatar from '../molecules/UserAvatar';
import FeatureList from '../organisms/FeatureList';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Box, TextField, Typography, Grid, FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import DateFnsUtils from '@date-io/date-fns';
import Rating from '@material-ui/lab/Rating';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import axios from "axios";
import config from "../../config";
import {Constants} from "../Constants";
import PropTypes from "prop-types";
import { withFirebase } from '../Firebase';

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
        },
        ratingSubmitButton: {
            width: '5ch'
        }
    }));

    const classes = useStyles();
    const [selectedStartDate, setSelectedStartDate] = React.useState(new Date('2014-08-18T21:11:54'));
    const [selectedEndDate, setSelectedEndDate] = React.useState(new Date('2014-08-18T21:11:54'));
    const [carAmount, setCarAmount] = React.useState('');
    const [imgUrl, setImgUrl] = React.useState('');
    const [size, setSize] = React.useState('');
    const [location, setLocation] = React.useState(null);
    const [numberAvail, setNumberAvail] = React.useState(null);
    const [dayPrice, setDayPrice] = React.useState(null);
    const [rating, setRating] = React.useState(0);
    const [ratingComment, setRatingComment] = React.useState("");
    const [reviews, setReviews] = React.useState([]);
    const [authUserHeaders, setAuthUserHeaders] = useState(null);
    const [listingObj, setListingObj] = useState(null);
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
    const handleRatingCommentChange = (event) => {
        setRatingComment(event.target.value);
    };

    const handleSubmitRating = () => {
        let newReview = {
            rating: rating,
            comment: ratingComment,
            user: authUserHeaders,
        };
        let listing = {
            creatorUserId: listingObj.creatorUserId,
            email: listingObj.email,
            listingId: listingObj.listingId,
            imgUrl: listingObj.imgUrl,
            size: listingObj.size,
            location: listingObj.location,
            numberAvail: listingObj.numberAvail,
            dayPrice: listingObj.dayPrice,
            reviews: [...listingObj.reviews, newReview],
        }
        axios.put(url + "/listings/" + listingId, listing, authUserHeaders).then(() => {
            alert("Successfully updated listing");
            axios.get(url + "/listings/single/" + listingId).then((resp) => responseToListing(resp.data)).catch(e => console.log(e))
        }).catch(e => console.log(e))
    };

    const responseToListing = (resp) => {
        console.log(resp);
        setListingObj(resp);
        setImgUrl(resp.imgUrl);
        setSize(resp.size);
        setLocation(resp.location);
        setNumberAvail(resp.numberAvail);
        setDayPrice(resp.dayPrice);
        setReviews(resp.reviews);
    };

    useEffect(() => {
        axios.get(url + "/listings/single/" + listingId).then((resp) => responseToListing(resp.data)).catch(e => console.log(e))
    }, []);

    useEffect(() => {
        // Sets authed user when firebase loads current user
        props.firebase.auth.onAuthStateChanged(authUser => {
            if (authUser) {
                authUser.getIdToken().then((token) => {
                    const reqHeaders = {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    };
                    setAuthUserHeaders(reqHeaders);
                });
            } else {
                setAuthUserHeaders(null);
            }
        });
    }, []);

    return (
        <div>
            <Header />
            <div className="ListingPage" >
                <Typography variant="h5" className="banner_text">{location}</Typography>
                <img src={imgUrl} alt={Constants.imgAlt.userParking}/>
            <div className = "belowImgContainer">
                <div className="descriptions">
                    <Typography variant="h6" className={classes.availabilityText}>{numberAvail} spots available - {size}</Typography>
                    <Typography variant="h6" className={classes.availabilityText}>${dayPrice}/day</Typography>
                    <Typography variant="h6" className={classes.descriptionText}>Located near Mount Pleasant, easy to access and close to many restaurants and public transportation.</Typography>
                    <FeatureList />
                    <Typography variant="h6">Map: </Typography>
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
                            <KeyboardTimePicker
                              margin="normal"
                              id="time-picker"
                              label="Start Time"
                              value={selectedStartDate}
                              onChange={handleStartDateChange}
                              KeyboardButtonProps={{
                             'aria-label': 'change start time',
                              }}
                            />
                            <KeyboardTimePicker
                              margin="normal"
                              id="time-picker"
                              label="End Time"
                              value={selectedEndDate}
                              onChange={handleEndDateChange}
                              KeyboardButtonProps={{
                             'aria-label': 'change end time',
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
                    <Button variant="contained" color="secondary" className={classes.submitButton} fullWidth>
                      Reserve
                    </Button>
                </Box>
                <Box component="fieldset" mb={3} borderColor="transparent">
                    <Typography component="legend">Write a review:</Typography>
                    <Rating
                        name="simple-controlled"
                        value={rating}
                        onChange={(event, newValue) => {
                            setRating(newValue);
                        }}
                    />
                </Box>
                <TextField
                    id="outlined-multiline-static"
                    label="Comment"
                    multiline
                    rows={4}
                    value={ratingComment}
                    onChange={handleRatingCommentChange}
                    variant="outlined"
                />
                <Button variant="contained" color="secondary" className={classes.ratingSubmitButton} onClick={handleSubmitRating}>
                    Submit
                </Button>
                <Typography variant="h5" className="reviews">{reviews}</Typography>
            </div>
            </div>
        </div>
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
