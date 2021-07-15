import { makeStyles } from '@material-ui/core/styles';
import { ButtonBase, Grid, Paper, Link } from '@material-ui/core';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { Constants } from '../Constants';

const ParkSpotListingCard = (props) => {
  const { imgUrl, size, location, numberAvail, dayPrice } = props;
  const headerStr = size + " parking spot at " + location;
  const availabilityStr = String(numberAvail) + " spots available";
  const dayPriceStr = "$" + String(dayPrice) + "/day";

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
      width: '700px'
    }
  }));

  const classes = useStyles();
  return (
    <Link to={{
      pathname: '/listing-page-example',
      state: imgUrl
    }}>
      <ButtonBase href='/listing-page-example'>
        <Paper>
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
