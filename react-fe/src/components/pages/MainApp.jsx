import Header from '../organisms/Header';
import ParkSpotListingCard from '../molecules/ParkSpotListingCard';
import { withFirebase } from '../Firebase';
import { useEffect, useState } from 'react';
import ReactMapGL from "react-map-gl";
import config from '../../config';
import axios from 'axios';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import CircularProgress from '@material-ui/core/CircularProgress';
import Geocode from "react-geocode";
import mapboxgl from "mapbox-gl"
import mapboxSdk from "@mapbox/mapbox-sdk/services/geocoding"

const useStyles = makeStyles({
  header_text: {
    marginTop: '10px',
    marginBottom: '10px'
  }
});

const MainApp = () => {
  let MAPBOX_TOKEN = "pk.eyJ1IjoiZGF2aWR3NyIsImEiOiJja3Jwc3RpdGQ4cjUyMm9tbjh6MmU2YzN6In0.rKQNwIwSGSGjw_u8UHM5XQ";

  const classes = useStyles();
  const url = config.api.url;
  const [listings, setListings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedParkSpot, setSelectedParkSpot] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 49.269520,
    longitude: -123.251240,
    width: '100vw',
    height: '100vh',
    zoom: 10
  });

  mapboxgl.accessToken = "pk.eyJ1IjoiZGF2aWR3NyIsImEiOiJja3Jwc3RpdGQ4cjUyMm9tbjh6MmU2YzN6In0.rKQNwIwSGSGjw_u8UHM5XQ";

  const createMarkerForListing = (listing) => {
    let mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken });
    mapboxClient
      .forwardGeocode({
        query: String(listing.location),
        autocomplete: false,
        limit: 1
      })
      .send()
      .then(function (response) {
        if (
          response &&
          response.body &&
          response.body.features &&
          response.body.features.length
        ) {
          var feature = response.body.features[0];

          var map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: feature.center,
            zoom: 10
          });

          // Create a marker and add it to the map.
          new mapboxgl.Marker().setLngLat(feature.center).addTo(map);
        }
      });
  }

  const responseToListings = (resp) => {
    const newListings = [];
    for (const listing of resp) {
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
    setLoading(false);
  };


  useEffect(() => {
    axios.get(url + "/listings/").then((resp) => {
      responseToListings(resp.data);
    }).catch((err) => {
      setLoading(false);
    });
  }, [url]);

  useEffect(() => {
    setLoading(true);
    if (searchTerm) {
      axios.get(url + "/listings/search?searchTerm=" + searchTerm).then((resp) => {
        responseToListings(resp.data);
      }).catch((err) => {
        setLoading(false);
      });
    } else {
      axios.get(url + "/listings/").then((resp) => {
        responseToListings(resp.data);
      }).catch((err) => {
        setLoading(false);
      });
    }
  }, [searchTerm, url]);

  return (
    <div className="App">
      <Header onSearchChange={setSearchTerm} />
      <Typography variant="h4" className={classes.header_text}><DriveEtaIcon color="secondary" fontSize="large" /> Available Parking Spaces <DriveEtaIcon color="secondary" fontSize="large" /></Typography>
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
      <div id="map"></div>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        onViewportChange={(viewport) => setViewport(viewport)}
      >
        {listings.map(createMarkerForListing)}
      </ReactMapGL>
    </div>
  );
};

export default withFirebase(MainApp);
