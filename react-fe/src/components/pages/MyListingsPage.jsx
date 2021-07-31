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
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import CircularProgress from '@material-ui/core/CircularProgress';
import ListingForm from '../organisms/ListingForm';

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
  const [activeBookings, setActiveBookings] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchListings = () => {
    if (searchTerm) {
      axios.get(url + "/listings/mine/search?searchTerm=" + searchTerm, authUserHeaders).then((resp) => setRespListings(resp.data));
    } else {
      axios.get(url + "/listings/mine", authUserHeaders).then((resp) => setRespListings(resp.data, authUserHeaders));
    }
  };

  // Returns a function to delete a listing by listingId, requires authorization headers
  const deleteListing = (listingId, reqHeaders) => {
    return () => {
      if (reqHeaders) {
        axios.delete(url + "/listings/" + listingId, reqHeaders).then(() => {
          alert("Successfully Deleted");
          fetchListings();
        }).catch(error => {
          alert("Server error - Failed to delete");
        });
      }
    };
  };

  const updateListing = (listingId, startDate, endDate, imgUrl, numberAvail, location, dayPrice, description, instructions, type, size) => {
    axios.put(url + "/listings/" + listingId, {
      startDate: startDate.toDateString(),
      endDate: endDate.toDateString(),
      imgUrl,
      numberAvail,
      size,
      location,
      dayPrice,
      description,
      instructions,
      type,
    }, authUserHeaders).then(() => {
      alert("Successfully Edited Listing");
      fetchListings();
    }).catch(error => {
      alert("Server error - Failed to edit");
    });
  };

  const setAuthHeaders = () => {
    if (props.firebase.getAuthHeaders()) {
      setAuthUserHeaders(props.firebase.getAuthHeaders());
    } else {
      setTimeout(setAuthHeaders, 100);
    }
  };

  useEffect(setAuthHeaders, []);

  useEffect(() => {
    setLoading(true);
    if (searchTerm && authUserHeaders) {
      axios.get(url + "/listings/mine/search?searchTerm=" + searchTerm, props.firebase.getAuthHeaders()).then((resp) => {
        setRespListings(resp.data);
        setLoading(false);
      }).catch((err) => {
        setLoading(false);
      });
    } else if (!searchTerm && authUserHeaders) {
      axios.get(url + "/listings/mine", props.firebase.getAuthHeaders()).then((resp) => {
        setRespListings(resp.data);
        setLoading(false);
      }).catch((err) => {
        setLoading(false);
      });
    }
  }, [searchTerm, url, authUserHeaders]);

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
                listingId={listing.listingId}
              />
            </Grid>
            <Grid item>
              <Button onClick={() => {
                if (activeBookings === listing.listingId) {
                  setActiveBookings("");
                } else {
                  setActiveBookings(listing.listingId);
                }
              }
              }>
                <LibraryBooksIcon />
              </Button>
            </Grid>
            <Grid item>
              <Button onClick={() => {
                if (activeEdit === listing.listingId) {
                  setActiveEdit("");
                } else {
                  setActiveEdit(listing.listingId);
                }
              }
              }>
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
              <ListingForm
                listingId={listing.listingId}
                onSubmit={updateListing}
                startDate={listing.startDate}
                endDate={listing.endDate}
                carAmt={listing.numberAvail}
                locn={listing.location}
                imgUrl={listing.imgUrl}
                dRate={listing.dayPrice}
                instr={listing.instructions}
                parkingSize={listing.size}
                parkingType={listing.type} />
            </Grid> : null
          }
          {activeBookings === listing.listingId ?
            <Grid item>
              <p>Active bookings placeholder</p>
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
        {loading ?
          <Grid item>
            <CircularProgress />
          </Grid>
          : null}
        {listings}
      </Grid>
    </div>
  );
};

export default withFirebase(MyListingsPage);
