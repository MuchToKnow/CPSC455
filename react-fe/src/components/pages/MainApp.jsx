import Header from '../organisms/Header';
import ParkSpotListingCard from '../molecules/ParkSpotListingCard';
import { withFirebase } from '../Firebase';
import { useEffect, useState } from 'react';
import config from '../../config';
import axios from 'axios';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DriveEtaIcon from '@material-ui/icons/DriveEta';

const useStyles = makeStyles({
  header_text: {
    marginTop: '10px',
    marginBottom: '10px'
  }
});

const MainApp = () => {
  const classes = useStyles();
  const url = config.api.url;
  const [listings, setListings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const responseToListings = (resp) => {
    const newListings = [];
    for (const listing of resp) {
      console.log(listing.imgUrl);
      newListings.push(
        <Grid item key={listing.listingId}>
          <ParkSpotListingCard
            listingId={listing.listingId}
            imgUrl={listing.imgUrl}
            size={listing.size}
            location={listing.location}
            numberAvail={listing.numberAvail}
            dayPrice={listing.dayPrice}
          />
        </Grid>
      );
    }
    setListings(newListings);
  };

  useEffect(() => {
    axios.get(url + "/listings/").then((resp) => responseToListings(resp.data));
  }, []);

  useEffect(() => {
    if (searchTerm) {

      axios.get(url + "/listings/search?searchTerm=" + searchTerm).then((resp) => responseToListings(resp.data));
    } else {
      axios.get(url + "/listings/").then((resp) => responseToListings(resp.data));
    }
  }, [searchTerm]);

  return (
    <div className="App">
      <Header onSearchChange={setSearchTerm} />
      <Typography variant="h4" className={classes.header_text}><DriveEtaIcon color="secondary" fontSize="large" /> Available Parking Spaces <DriveEtaIcon color="secondary" fontSize="large" /></Typography>
      <Grid
        container
        direction="column"
        spacing={2}
      >
        {listings}
      </Grid>
    </div>
  );
};

export default withFirebase(MainApp);
