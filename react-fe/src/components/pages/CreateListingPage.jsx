import { makeStyles } from '@material-ui/core/styles';
import {
    TextField,
    Box,
    Grid, FormControl, InputLabel, Select, MenuItem, Button
} from '@material-ui/core';
import React, { useState } from 'react';
import { withFirebase } from '../Firebase';
import Header from "../organisms/Header";
import {KeyboardDatePicker, KeyboardTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const CreateListingPage = (props) => {
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

    const [selectedStartDate, setSelectedStartDate] = React.useState(new Date('2014-08-18T21:11:54'));
    const [selectedEndDate, setSelectedEndDate] = React.useState(new Date('2014-08-18T21:11:54'));
    const [availableDates, setAvailableDates] = [React.useState(new Date('2014-08-18T21:11:54'))];
    const [availableTimeIntervals, setAvailableTimeIntervals] = [];
    const [carAmount, setCarAmount] = React.useState('');
    const [location, setLocation] = React.useState('');
    const [hourlyRate, setHourlyRate] = React.useState('');
    const [dailyRate, setDailyRate] = React.useState('');
    const [monthlyRate, setMonthlyRate] = React.useState('');
    const [instructions, setInstructions] = React.useState('');
    const [typeOfParking, setTypeOfParking] = React.useState('');


    const handleStartDateChange = (date) => {
        setSelectedStartDate(date);
    };

    const handleEndDateChange = (date) => {
        setSelectedEndDate(date);
    };

    const handleCarAmountChange = (event) => {
        setCarAmount(event.target.value);
    };

    const handleLocationChange = (event) => {
        setLocation(event.target.value);
    };

    const handleTypeOfParkingChange = (event) => {
        setTypeOfParking(event.target.value);
    };



    return (
        <div>
            <Header />
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
                    <TextField
                        required
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
                        id="hourlyRate"
                        label="Hourly Rate"
                        name="hourlyRate"
                        variant="outlined"
                        value={hourlyRate}
                        fullWidth
                        onChange={e => setHourlyRate(e.target.value)}
                    />
                    <TextField
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
                        required
                        id="monthlyRate"
                        label="Monthly Rate"
                        name="monthlyRate"
                        variant="outlined"
                        value={monthlyRate}
                        fullWidth
                        onChange={e => setMonthlyRate(e.target.value)}
                    />
                    <TextField
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
                    <Button variant="contained" color="secondary" className={classes.submitButton} fullWidth>
                        Create Parking Listing!
                    </Button>
                </Box>
            </div>
        </div>
    );
};
export default withFirebase(CreateListingPage);