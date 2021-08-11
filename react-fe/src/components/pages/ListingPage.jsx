import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../../styling/ListingPage.css';
import Header from '../organisms/Header';
import FeatureList from '../organisms/FeatureList';
import { makeStyles } from '@material-ui/core/styles';
import {
    Button,
    Box,
    TextField,
    Typography,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Paper,
    Divider,
} from "@material-ui/core";
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
            width: 500,
        },
        image: {
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
            maxHeight: 400,
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
    const [location, setLocation] = React.useState('');
    const [numberAvail, setNumberAvail] = React.useState(null);
    const [dayPrice, setDayPrice] = React.useState(null);
    const [description, setDescription] = useState(null);
    const [rating, setRating] = React.useState(0);
    const [ratingComment, setRatingComment] = React.useState("");
    const [reviewsList, setReviewsList] = React.useState([]);
    const [reviewsEntries, setReviewsEntries] = React.useState([]);
    const [reviewsAvg, setReviewsAvg] = React.useState(null);
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
    const handleRatingCommentChange = (event) => {
        setRatingComment(event.target.value);
    };

    const responseToListing = (resp) => {
        console.log(resp);
        setImgUrl(resp.imgUrl);
        setSize(resp.size);
        setLocation(resp.location);
        setNumberAvail(resp.numberAvail);
        setDayPrice(resp.dayPrice);
        setDescription(resp.description);
        setMinDate(new Date(resp.startDate));
        setMaxDate(new Date(resp.endDate));
    };

    const responseToReview = (resp) => {
        setReviewsList(resp);
    };

    useEffect(() => {
        axios.get(url + "/listings/single/" + listingId).then((resp) => responseToListing(resp.data)).catch(e => console.log(e));
    }, [url, listingId]);

    useEffect(() => {
        axios.get(url + "/reviews/byListing/" + listingId).then((resp) => responseToReview(resp.data)).catch(e => console.log(e));
    }, [url, listingId]);

    const setAuthHeaders = () => {
        if (props.firebase.getAuthHeaders()) {
            setAuthUserHeaders(props.firebase.getAuthHeaders());
        } else {
            setTimeout(setAuthHeaders, 100);
        }
    };

    useEffect(setAuthHeaders, [props.firebase, setAuthHeaders]);

    const onSubmitRating = () => {
        axios.post(url + "/reviews", {
            rating: rating,
            comment: ratingComment,
            listingId
        }, authUserHeaders).then(() => {
            alert("Review created successfully");
        }).then(() => {
            axios.get(url + "/reviews/byListing/" + listingId).then((resp) => responseToReview(resp.data)).catch(e => console.log(e));
        }).catch((err) => {
            alert("Server error - failed to create review: " + err);
        });
    };

    const onReserve = () => {
        axios.post(url + "/bookings", {
            startDate: selectedStartDate,
            endDate: selectedEndDate,
            listingId,
            carAmount
        }, authUserHeaders).then((resp) => {
            alert("Booking created successfully");
        }).catch((err) => {
            if (err.response && err.response.data && err.response.data.error) {
                alert("Server error - failed to create booking: " + err.response.data.error);
            }
        });
    };

    const menuList = [];
    for (let i = 1; i <= numberAvail; i++) {
        menuList.push(
            <MenuItem value={i}>{String(i)}</MenuItem>
        );
    }

    useEffect(() => {
        const allReviews = reviewsList;
        const reviewArr = [];
        let avg = 0;
        let reviewCount = 0;
        for (const review of allReviews) {
            reviewArr.push(
                <Grid container spacing={2}>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Rating name="read-only" value={review.rating} readOnly />
                                <Typography variant="body2" gutterBottom>
                                    {review.comment}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            );

            avg += review.rating;
            reviewCount++;
        }
        avg = avg / reviewCount;
        setReviewsEntries(reviewArr);
        setReviewsAvg(avg);
    }, [reviewsList]);

    return (
        <div>
            <Header />
            <div className="ListingPage" >
                <Typography variant="h5" className="banner_text">{location}</Typography>
                <img className={classes.image} src={imgUrl} alt={Constants.imgAlt.userParking} />
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
                                <Typography variant="body1" gutterBottom>
                                    Overall Rating: <Rating name="read-only" precision={0.1} value={reviewsAvg} style={{ position: "relative", top: 5 }} readOnly />
                                </Typography>
                                <Divider style={{ marginTop: 20, marginBottom: 20 }} />
                                {reviewsEntries.length === 0 ?
                                    <Typography variant="body2" gutterBottom>
                                        No ratings yet
                                    </Typography> :
                                    <div>
                                        {reviewsEntries}
                                    </div>
                                }
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
                                style={{ marginLeft: 20, marginTop: -20, marginBottom: 10, width: 300 }}
                            />
                            <Button
                                variant="contained" color="secondary"
                                style={{ marginLeft: 20, padding: 0, paddingTop: 5, paddingBottom: 5, display: "block" }}
                                className={classes.ratingSubmitButton}
                                onClick={onSubmitRating}
                            >
                                Submit
                            </Button>
                        </div>
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
