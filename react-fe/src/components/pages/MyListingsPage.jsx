import Header from '../organisms/Header';
import ParkSpotListingCard from '../molecules/ParkSpotListingCard';
import ConfirmDialog from '../atoms/ConfirmDialog';
import { withFirebase } from '../Firebase';
import { useEffect, useState } from 'react';
import config from '../../config';
import axios from 'axios';
import { Grid, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

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

  // Returns a function to delete a listing by listingId, requires authorization headers
  const deleteListing = (listingId, reqHeaders) => {
    return () => {
      if (reqHeaders) {
        axios.delete(url + "/listings/" + listingId, reqHeaders).then(() => {
          alert("Successfully Deleted");
          if (searchTerm) {
            axios.get(url + "/listings/mine/search?searchTerm=" + searchTerm, authUserHeaders).then((resp) => responseToListings(resp.data));
          } else {
            axios.get(url + "/listings/mine", reqHeaders).then((resp) => responseToListings(resp.data, reqHeaders));
          }
        }).catch(error => {
          alert("Server error - Failed to delete");
        });
      }
    };
  };

  const responseToListings = (resp, reqHeaders) => {
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
          <Button>
            <EditIcon />
          </Button>
          <ConfirmDialog
            onConfirm={deleteListing(listing.listingId, reqHeaders)}
            dialogText="Are you sure you want to delete this listing?"
            actionNegative="Cancel"
            actionPositive="Delete"
            buttonIcon={(<DeleteIcon />)}
          />
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
          axios.get(url + "/listings/mine", reqHeaders).then((resp) => responseToListings(resp.data, reqHeaders));
        });
      } else {
        setAuthUserHeaders(null);
      }
    });
  }, []);

  useEffect(() => {
    console.log(authUserHeaders);
    if (searchTerm && authUserHeaders) {
      axios.get(url + "/listings/mine/search?searchTerm=" + searchTerm, authUserHeaders).then((resp) => responseToListings(resp.data));
    } else if (!searchTerm && authUserHeaders) {
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
