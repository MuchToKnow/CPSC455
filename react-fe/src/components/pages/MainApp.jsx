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
import mapboxgl from "mapbox-gl";
import mapboxSdk from "@mapbox/mapbox-sdk/services/geocoding";

const useStyles = makeStyles({
  header_text: {
    marginTop: '20px',
    marginBottom: '10px',
  },
  listingsElements: {
    width: "40%",
  }
});

const MainApp = () => {
  const mapContainerRef = useRef(null);
  const map = useRef(null);
  const marker = useRef(null);
  const classes = useStyles();
  const url = config.api.url;
  const [listings, setListings] = useState([]);
  const [listingElements, setListingElements] = useState([]);
  const [locations, setLocations] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [lng, setLng] = useState(-123.251240);
  const [lat, setLat] = useState(49.269520);
  const [zoom, setZoom] = useState(8);

  mapboxgl.accessToken = "pk.eyJ1IjoiZGF2aWR3NyIsImEiOiJja3Jwc3RpdGQ4cjUyMm9tbjh6MmU2YzN6In0.rKQNwIwSGSGjw_u8UHM5XQ";
  const mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken });

  useEffect(() => {
    marker.current = new mapboxgl.Marker();
  }, [marker]);

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom,
    });
  });

  useEffect(() => {
    if (map.current) {
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

      map.current.on('move', () => {
        setLng(map.current.getCenter().lng.toFixed(4));
        setLat(map.current.getCenter().lat.toFixed(4));
        setZoom(map.current.getZoom().toFixed(2));
      });
    }
  }, [map]);

  const responseToListings = (resp) => {
    setListings(resp);
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
    const promises = [];
    listings.forEach((listing) => {
      console.log({ listing });
      if (listing.location) {
        promises.push(mapboxClient
          .forwardGeocode({
            query: String(listing.location),
            autocomplete: false,
            limit: 1
          })
          .send()
          .then((response) => {
            response.listingId = listing.listingId;
            return response;
          }));
      }
    });
    Promise.all(promises)
      .then((responses) => {
        const locationsCopy = JSON.parse(JSON.stringify(locations));
        responses.forEach((response) => {
          if (
            !response ||
            !response.body ||
            !response.body.features ||
            !response.body.features.length ||
            !response.listingId
          ) {
            console.error('Invalid response:');
            console.error(response);
            return;
          }
          const feature = response.body.features[0];
          locationsCopy[response.listingId] = feature.center;
          // // Create a marker and add it to the map.
          // new mapboxgl.Marker().setLngLat(feature.center).addTo(map);
        });
        setLocations(locationsCopy);
      });
  }, [listings]);

  useEffect(() => {
    const listingElements = [];
    for (const listing of listings) {
      listingElements.push(
        <Grid
          item
          key={listing.listingId}
          onMouseEnter={() => {
            if (locations[listing.listingId] && map.current && marker.current) {
              marker.current.setLngLat(locations[listing.listingId]).addTo(map.current);
            }
          }}
          onMouseLeave={() => {
            if (marker.current) {
              marker.current.remove();
            }
          }}
        >
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
    setListingElements(listingElements);
  }, [listings, map, locations]);

  return (
    <div className="App">
      <Header onSearchChange={setSearchTerm} />
      <div className="ListingsAndMap">
        <Grid
          className={classes.listingsElements}
          container
          direction="column"
          spacing={2}
        >
          <Typography variant="h4" className={classes.header_text}><DriveEtaIcon color="secondary" fontSize="large" /> Available Parking Spaces <DriveEtaIcon color="secondary" fontSize="large" /></Typography>
          {loading ?
            <Grid item>
              <CircularProgress />
            </Grid>
            : null}
          {listingElements}
        </Grid>
        <div className="map-div">
          <div className="map-container" ref={mapContainerRef} />
        </div>
      </div>
    </div>
  );
};

export default withFirebase(MainApp);
