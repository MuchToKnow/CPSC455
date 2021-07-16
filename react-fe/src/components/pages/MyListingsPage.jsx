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
import DriveEtaIcon from '@material-ui/icons/DriveEta';

const useStyles = makeStyles({
  header_text: {
    marginTop: '10px',
    marginBottom: '10px'
  }
});

const MyListingsPage = (props) => {
  const classes = useStyles();
  const url = config.api.url;
  const [respListings, setRespListings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [authUserHeaders, setAuthUserHeaders] = useState(null);
  const [activeEdit, setActiveEdit] = useState("");

  // Returns a function to delete a listing by listingId, requires authorization headers
  const deleteListing = (listingId, reqHeaders) => {
    return () => {
      if (reqHeaders) {
        axios.delete(url + "/listings/" + listingId, reqHeaders).then(() => {
          alert("Successfully Deleted");
          if (searchTerm) {
            axios.get(url + "/listings/mine/search?searchTerm=" + searchTerm, authUserHeaders).then((resp) => setRespListings(resp.data));
          } else {
            axios.get(url + "/listings/mine", reqHeaders).then((resp) => setRespListings(resp.data, reqHeaders));
          }
        }).catch(error => {
          alert("Server error - Failed to delete");
        });
      }
    };
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
          axios.get(url + "/listings/mine", reqHeaders).then((resp) => setRespListings(resp.data));
        });
      } else {
        setAuthUserHeaders(null);
      }
    });
  }, []);

  useEffect(() => {
    if (searchTerm && authUserHeaders) {
      axios.get(url + "/listings/mine/search?searchTerm=" + searchTerm, authUserHeaders).then((resp) => setRespListings(resp.data));
    } else if (!searchTerm && authUserHeaders) {
      axios.get(url + "/listings/mine", authUserHeaders).then((resp) => setRespListings(resp.data));
    }
  }, [searchTerm]);

  const listings = [];
  for (const listing of respListings) {
    listings.push(
      <Grid item key={listing.listingId}>
        <Grid container direction="column">
          <Grid container direction="row" alignItems='center' justify='center'>
            <Grid item>
              <ParkSpotListingCard
                imgUrl={listing.imgUrl}
                size={listing.size}
                location={listing.location}
                numberAvail={listing.numberAvail}
                dayPrice={listing.dayPrice}
              />
            </Grid>
            <Grid item>
              <Button onClick={() => setActiveEdit(listing.listingId)}>
                <EditIcon />
              </Button>
            </Grid>
            <Grid item>
              <ConfirmDialog
                onConfirm={deleteListing(listing.listingId, authUserHeaders)}
                dialogText="Are you sure you want to delete this listing?"
                actionNegative="Cancel"
                actionPositive="Delete"
                buttonIcon={(<DeleteIcon />)}
              />
            </Grid>
          </Grid>
          {activeEdit === listing.listingId ?
            <Grid item>
              <p>EDIT AREA PLACEHOLDER</p>
            </Grid> : null
          }
        </Grid>
      </Grid >
    );
  }

  return (
    <div className="App">
      <Header onSearchChange={setSearchTerm} />
      <Typography variant="h4" className={classes.header_text}><DriveEtaIcon color="secondary" fontSize="large" /> My Listings <DriveEtaIcon color="secondary" fontSize="large" /></Typography>
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