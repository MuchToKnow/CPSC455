import React from 'react';
import '../../styling/ListingPage.css';
import Header from '../organisms/Header';
import UserAvatar from '../molecules/UserAvatar';
import FeatureList from '../organisms/FeatureList';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Box, Typography, Grid, FormControl, InputLabel, Select, MenuItem, ImageList, ImageListItem } from "@material-ui/core";
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

function ListingPageExample(props) {
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
    const [carAmount, setCarAmount] = React.useState('');

    const itemData = [
        {
            img: 'https://static2.mansionglobal.com/production/media/article-images/4b9af2424c2328bf3782855a87fef473/large_B3-EN112_Garage_IM_20190717123019.jpg',
            title: 'front view1',
        },
        {
            img: 'https://www.corporatetravelsafety.com/safety-tips/wp-content/uploads/2018/09/Garage-Door-Interior-crop.jpg',
            title: 'inside1',
        },
        {
            img: 'https://www.refreshrenovations.global/images/uploads/Restrictions-when-building-a-garage-mob.jpg',
            title: 'front view2',
        },
        {
            img: 'https://www.niceforyou.com/sites/default/files/styles/1920x900_resize/public/2019-05/soon_1_0.jpg?itok=SENebJ1P',
            title: 'inside2',
        },
    ];

    const handleStartDateChange = (date) => {
        setSelectedStartDate(date);
    };

    const handleEndDateChange = (date) => {
            setSelectedEndDate(date);
    };

    const handleCarAmountChange = (event) => {
        setCarAmount(event.target.value);
    };

    return (
        <div>
            <Header />
            <div className="ListingPage" >
                <Typography variant="h5" className="banner_text">Example page for Large parking spot in Mount Pleasant</Typography>
{/*                 <ImageList sx={{ width: 500, height: 450 }} cols={2} rowHeight={164}> */}
{/*                   {itemData.map((item) => ( */}
{/*                     <ImageListItem key={item.img}> */}
{/*                       <img */}
{/*                         srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format 1x, */}
{/*                             ${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`} */}
{/*                         alt={item.title} */}
{/*                         loading="lazy" */}
{/*                       /> */}
{/*                     </ImageListItem> */}
{/*                   ))} */}
{/*                 </ImageList> */}
                <img src={"https://static2.mansionglobal.com/production/media/article-images/4b9af2424c2328bf3782855a87fef473/large_B3-EN112_Garage_IM_20190717123019.jpg"} alt="garageImg"/>
            <div className = "belowImgContainer">
                <div className="descriptions">
                    <Typography variant="h6" className={classes.availabilityText}>2 spots available - Rooftop Covered</Typography>
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
            </div>
            </div>
        </div>
    );
};
export default ListingPageExample;
