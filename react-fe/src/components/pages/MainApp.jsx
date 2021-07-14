import Header from '../organisms/Header';
import ParkSpotListingCard from '../molecules/ParkSpotListingCard';
import { withFirebase } from '../Firebase';
import { useEffect, useState } from 'react';
import config from '../../config';
import axios from 'axios';
import { Grid } from '@material-ui/core';

const MainApp = () => {
  const url = config.api.url;
  const [listings, setListings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const responseToListings = (resp) => {
    const newListings = [];
    for (const listing of resp) {
      newListings.push(
        <ParkSpotListingCard
          key={listing.listingId}
          imgUrl={listing.imgUrl}
          size={listing.size}
          location={listing.location}
          numberAvail={listing.numberAvail}
          dayPrice={listing.dayPrice}
        />
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
      <Grid
        container
        direction="column"
      >
        {listings}
      </Grid>
    </div>
  );
};

export default withFirebase(MainApp);
