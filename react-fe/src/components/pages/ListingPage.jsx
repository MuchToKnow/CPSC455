import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import '../../styling/ListingPage.css';
import Header from '../organisms/Header';
import FeatureList from '../organisms/FeatureList';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Box, TextField, Typography, Grid, FormControl, InputLabel, Select, MenuItem, Paper, Divider, List, ListItem, ListItemText} from "@material-ui/core";
import DateFnsUtils from '@date-io/date-fns';
import Rating from '@material-ui/lab/Rating';
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
        },
        ratingSubmitButton: {
            width: '5ch'
        },
        paper: {
            padding: theme.spacing(2),
            margin: 'auto',
            maxWidth: 500,
        }
    }));

    const classes = useStyles();
    const [minDate, setMinDate] = useState(new Date());
    const [maxDate, setMaxDate] = useState(new Date());
    const [selectedStartDate, setSelectedStartDate] = useState(new Date());
    const [selectedEndDate, setSelectedEndDate] = useState(new Date());
    const [carAmount, setCarAmount] = React.useState('');
    const [imgUrl, setImgUrl] = React.useState('');
    const [size, setSize] = React.useState('');
    const [location, setLocation] = React.useState(null);
    const [numberAvail, setNumberAvail] = React.useState(null);
    const [dayPrice, setDayPrice] = React.useState(null);
    const [description, setDescription] = useState(null);
    const [rating, setRating] = React.useState(0);
    const [ratingComment, setRatingComment] = React.useState("");
    const [reviewsList, setReviewsList] = React.useState([]);
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
            // reviews: listingObj.reviews,
            reviews: [...listingObj.reviews, newReview],
        }
        axios.put(url + "/listings/" + listingId, listing, authUserHeaders).then(() => {
            alert("Successfully updated listing");
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
        setDescription(resp.description);
        setMinDate(new Date(resp.startDate));
        setMaxDate(new Date(resp.endDate));
        setReviewsList([...reviewsList, resp.reviews]);
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

    // const allReviews = [];
    // for (const review of reviewsList) {
    //     allReviews.push(
    //         <ListItem alignItems="flex-start">
    //             <ListItemText
    //                 primary={review.comment}
    //             />
    //         </ListItem>
    //     );
    // }

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
                    <div className="reviewsAndSubmitReview">
                        <div className="userReviews">
                            <Paper className={classes.paper}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm container>
                                        <Grid item xs container direction="column" spacing={2}>
                                            <Grid item xs>
                                                <Rating name="read-only" value={5} readOnly />
                                                <Typography variant="body2" gutterBottom>
                                                    Good parking spot! 10/10
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm container>
                                        <Grid item xs container direction="column" spacing={2}>
                                            <Grid item xs>
                                                <Rating name="read-only" value={5} readOnly />
                                                <Typography variant="body2" gutterBottom>
                                                    Excellent place
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm container>
                                        <Grid item xs container direction="column" spacing={2}>
                                            <Grid item xs>
                                                <Rating name="read-only" value={4} readOnly />
                                                <Typography variant="body2" gutterBottom>
                                                    easy access, nice owners!
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm container>
                                        <Grid item xs container direction="column" spacing={2}>
                                            <Grid item xs>
                                                <Rating name="read-only" value={1} readOnly />
                                                <Typography variant="body2" gutterBottom>
                                                    someone broke into my car
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </div>
                        <div className="reviewBox">
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
                                style={{marginLeft: 20, marginTop: -20, marginBottom: 10}}
                            />
                            <Button
                                variant="contained" color="secondary"
                                style={{marginLeft: 20, padding: 0, paddingTop: 5, paddingBottom: 5, display: "block"}}
                                className={classes.ratingSubmitButton}
                                onClick={handleSubmitRating}
                            >
                                Submit
                            </Button>
                        </div>
                        {/*<List className={classes.reviewsForThisListing}>*/}
                        {/*    <ListItem alignItems="flex-start">*/}
                        {/*        <Rating name="read-only" value={5} readOnly />*/}
                        {/*        <ListItemText*/}
                        {/*            primary="Good parking spot! 10/10"*/}
                        {/*        />*/}
                        {/*    </ListItem>*/}
                        {/*    <Divider variant="inset" component="li" />*/}
                        {/*    <ListItem alignItems="flex-start">*/}
                        {/*        <Rating name="read-only" value={4.5} readOnly />*/}
                        {/*        <ListItemText*/}
                        {/*            primary="Good experience"*/}
                        {/*        />*/}
                        {/*    </ListItem>*/}
                        {/*</List>*/}
                    </div>
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
