import Header from '../organisms/Header';
import ParkSpotListingCard from '../molecules/ParkSpotListingCard';
import { withFirebase } from '../Firebase';
import { useEffect, useState } from 'react';
import config from '../../config';
import axios from 'axios';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles({
  header_text: {
    marginTop: '10px',
    marginBottom: '10px'
  }
});

const MyListingsPage = (props) => {
  const classes = useStyles();
  const url = config.api.url;
  const [listings, setListings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [authUserHeaders, setAuthUserHeaders] = useState(null);


  const responseToListings = (resp) => {
    const newListings = [];
    for (const listing of resp) {
      newListings.push(
        <Grid item>
          <ParkSpotListingCard
            key={listing.listingId}
            imgUrl={listing.imgUrl}
            size={listing.size}
            location={listing.location}
            numberAvail={listing.numberAvail}
            dayPrice={listing.dayPrice}
          />
          <DeleteIcon></DeleteIcon>
        </Grid>
      );
    }
    setListings(newListings);
  };

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
          axios.get(url + "/listings/mine", reqHeaders).then((resp) => responseToListings(resp.data));
        });
      } else {
        setAuthUserHeaders(null);
      }
    });
  }, []);

  useEffect(() => {
    if (searchTerm && authUserHeaders) {
      axios.get(url + "/listings/mine/search?searchTerm=" + searchTerm, authUserHeaders).then((resp) => responseToListings(resp.data));
    } else if (searchTerm && authUserHeaders) {
      axios.get(url + "/listings/mine", authUserHeaders).then((resp) => responseToListings(resp.data));
    }
  }, [searchTerm]);

  return (
    <div className="App">
      <Header onSearchChange={setSearchTerm} />
      <Typography variant="h4" className={classes.header_text}>My Listings</Typography>
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

export default withFirebase(MyListingsPage);
