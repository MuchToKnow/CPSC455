import { makeStyles } from '@material-ui/core/styles';
import { ButtonBase, Grid, Paper, Link } from '@material-ui/core';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { Constants } from '../Constants';
import React, {useEffect} from "react";
import axios from "axios";
import Rating from "@material-ui/lab/Rating";
import config from '../../config';

const ParkSpotListingCard = (props) => {
  const url = config.api.url;
  const { listingId, imgUrl, size, location, numberAvail, dayPrice } = props;
  const headerStr = size + " parking spot at " + location;
  const availabilityStr = String(numberAvail) + " spots available";
  const dayPriceStr = "$" + String(dayPrice) + "/day";
  const [overallRating, setOverallRating] = React.useState(0);

  const useStyles = makeStyles((theme) => ({
    img: {
      display: 'block',
      maxWidth: '256px',
      maxHeight: '128px',
      borderRadius: '5px',
      marginTop: '20px',
      marginBottom: '20px'
    },
    grid: {
      maxWidth: '600px'
    }
  }));

  const classes = useStyles();

  const calculateAvg = (resp) => {
    let count = resp.length;
    let total = 0;
    for (const review of resp) {
      total += review.rating;
    }
    setOverallRating(total / count);
  };

  useEffect(() => {
    axios.get(url + "/reviews/byListing/" + listingId).then((resp) => calculateAvg(resp.data)).catch(e => console.log(e));
  }, [listingId, url]);

  return (
    <Link to={{
      pathname: '/listing-page/' + listingId
    }}>
      <ButtonBase id='link' href={"/listing-page/" + listingId}>
        <Paper className="listingItem">
          <Grid container direction="row" justify="space-evenly" alignItems="center" className={classes.grid}>
            <Grid item>
              <img src={imgUrl} alt={Constants.imgAlt.userParking} className={classes.img} />
            </Grid>
            <Grid item xs={5}>
              <Grid item xs={12}>
                <Typography gutterBottom variant="subtitle1">{headerStr}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>{availabilityStr}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Rating name="read-only" precision={0.1} value={overallRating} readOnly />
              </Grid>
            </Grid>
            <Grid item xs={1}>
              <Typography variant="subtitle1">{dayPriceStr}</Typography>
            </Grid>
          </Grid>
        </Paper>
      </ButtonBase>
    </Link>
  );
};

ParkSpotListingCard.propTypes = {
  imgUrl: PropTypes.string,
  size: PropTypes.string,
  location: PropTypes.string,
  numberAvail: PropTypes.number,
  dayPrice: PropTypes.number,
  hourPrice: PropTypes.number,
};

export default ParkSpotListingCard;
