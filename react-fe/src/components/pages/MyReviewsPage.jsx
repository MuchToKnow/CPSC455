import Header from '../organisms/Header';
import ConfirmDialog from '../atoms/ConfirmDialog';
import { withFirebase } from '../Firebase';
import React, { useEffect, useState } from 'react';
import config from '../../config';
import axios from 'axios';
import {ButtonBase, Grid, Link, Paper, Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import RateReviewIcon from '@material-ui/icons/RateReview';
import CircularProgress from '@material-ui/core/CircularProgress';
import Rating from "@material-ui/lab/Rating";

const useStyles = makeStyles({
  header_text: {
    marginTop: '10px',
    marginBottom: '10px'
  },
  grid: {
    width: '500px'
  }
});

const MyReviewsPage = (props) => {
  const classes = useStyles();
  const url = config.api.url;
  const [respReviews, setRespReviews] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [authUserHeaders, setAuthUserHeaders] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchReviews = () => {
    if (searchTerm) {
      axios.get(url + "/reviews/mine/search?searchTerm=" + searchTerm, authUserHeaders).then((resp) => setRespReviews(resp.data));
    } else {
      axios.get(url + "/reviews/mine", authUserHeaders).then((resp) => setRespReviews(resp.data, authUserHeaders));
    }
  };

  // Returns a function to delete a review by reviewId, requires authorization headers
  const deleteReview = (reviewId, reqHeaders) => {
    return () => {
      if (reqHeaders) {
        axios.delete(url + "/reviews/" + reviewId, reqHeaders).then(() => {
          alert("Successfully Deleted");
          fetchReviews();
        }).catch(error => {
          alert("Server error - Failed to delete");
        });
      }
    };
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
      axios.get(url + "/reviews/mine/search?searchTerm=" + searchTerm, props.firebase.getAuthHeaders()).then((resp) => {
        setRespReviews(resp.data);
        setLoading(false);
      }).catch((err) => {
        setLoading(false);
      });
    } else if (!searchTerm && authUserHeaders) {
      axios.get(url + "/reviews/mine", props.firebase.getAuthHeaders()).then((resp) => {
        console.log(resp.data);
        setRespReviews(resp.data);
        setLoading(false);
      }).catch((err) => {
        setLoading(false);
      });
    }
  }, [searchTerm, url, authUserHeaders]);

  const reviews = [];
  for (const review of respReviews) {
    reviews.push(
      <Grid item key={review.reviewId}>
        <Grid container direction="column">
          <Grid container direction="row" alignItems='center' justify='center'>
            <Grid item>
              <Link to={{
                pathname: '/listing-page-example/' + review.listingId
              }}>
                <ButtonBase id='link' href={"/listing-page-example/" + review.listingId}>
                  <Paper>
                    <Grid container direction="column" justify="space-evenly" alignItems="center"  className={classes.grid}>
                      <Rating name="read-only" value={review.rating} style={{position: "relative", top: 5, paddingTop: 20, paddingBottom: 20}} readOnly />
                      <Grid item xs={12}>
                        <Typography variant="body2" gutterBottom width="auto">
                          {review.comment}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Paper>
                </ButtonBase>
              </Link>
            </Grid>
            <Grid item>
              <ConfirmDialog
                onConfirm={deleteReview(review.reviewId, authUserHeaders)}
                dialogText="Are you sure you want to delete this review?"
                actionNegative="Cancel"
                actionPositive="Delete"
                buttonIcon={(<DeleteIcon />)}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid >
    );
  }

  return (
    <div className="App">
      <Header onSearchChange={setSearchTerm} />
      <Typography variant="h4" className={classes.header_text}><RateReviewIcon color="secondary" fontSize="large" /> My Reviews <RateReviewIcon color="secondary" fontSize="large" /></Typography>
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
        {reviews}
      </Grid>
    </div>
  );
};

export default withFirebase(MyReviewsPage);
