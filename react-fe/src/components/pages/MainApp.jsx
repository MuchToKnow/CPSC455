import Header from '../organisms/Header';
import ParkSpotListingCard from '../molecules/ParkSpotListingCard';
import { withFirebase } from '../Firebase';
import React, { useEffect, useRef, useState } from 'react';
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
  const mapContainerRef = useRef(null);
  const classes = useStyles();
  const url = config.api.url;
  const [listings, setListings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [lng, setLng] = useState(-123.251240);
  const [lat, setLat] = useState(49.269520);
  const [zoom, setZoom] = useState(8);

  mapboxgl.accessToken = "pk.eyJ1IjoiZGF2aWR3NyIsImEiOiJja3Jwc3RpdGQ4cjUyMm9tbjh6MmU2YzN6In0.rKQNwIwSGSGjw_u8UHM5XQ";
  const mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken });

  const createMarkerForListing = (listing, map) => {
    mapboxClient
      .forwardGeocode({
        query: String(listing.location),
        autocomplete: false,
        limit: 1
      })
      .send()
      .then((response) => {
        if (
          !response ||
          !response.body ||
          !response.body.features ||
          !response.body.features.length
        ) {
          console.error('Invalid response:');
          console.error(response);
          return;
        }
        const feature = response.body.features[0];

        // Create a marker and add it to the map.
        new mapboxgl.Marker().setLngLat(feature.center).addTo(map);
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

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom,
    });

    listings.map((listing) => {
      createMarkerForListing(listing, map);
    });

    map.addControl(new mapboxgl.NavigationControl(), 'top-right')

    map.on('move', () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

    // Clean up on unmount
    return () => map.remove();

  }, []);

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
      <div>
        <div className="map-container" ref={mapContainerRef} />
      </div>
    </div>
  );
};

export default withFirebase(MainApp);
