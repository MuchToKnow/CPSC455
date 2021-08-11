import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withFirebase } from '../Firebase';
import CircularProgress from '@material-ui/core/CircularProgress';
import config from '../../config';
import axios from 'axios';
import Header from '../organisms/Header';
import { DataGrid } from '@material-ui/data-grid';
import { Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import ConfirmDialog from '../atoms/ConfirmDialog';
import {Constants} from "../Constants";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2)
  },
  header_text: {
    marginTop: '10px',
    marginBottom: '10px'
  },
  del_btn: {
    backgroundColor: theme.palette.error.main
  },
  thumb: {
    minWidth: 90,
    maxWidth: 90,
    maxHeight: 45,
    minHeight: 45,
  }
}));


const createData = (id, location, hostEmail, startDate, endDate, carAmount, instructions, deleteId, listingId, imgUrl) => {
  return { id, location, hostEmail, startDate, endDate, carAmount, instructions, deleteId, listingId, imgUrl };
};


const MyBookingsTable = (props) => {
  const classes = useStyles();
  const url = config.api.url;
  const [authUserHeaders, setAuthUserHeaders] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);

  const setAuthHeaders = () => {
    if (props.firebase.getAuthHeaders()) {
      setAuthUserHeaders(props.firebase.getAuthHeaders());
    } else {
      setTimeout(setAuthHeaders, 100);
    }
  };

  const getAndSetBookings = () => {
    if (authUserHeaders) {
      axios.get(url + "/bookings/mine", authUserHeaders).then((res) => {
        setBookings(res.data);
        setLoading(false);
      }).catch(() => {
        setLoading(false);
      });
    }
  };

  useEffect(setAuthHeaders, [props.firebase, setAuthHeaders]);

  useEffect(getAndSetBookings, [url, authUserHeaders]);

  const deleteBooking = (bookingId, reqHeaders) => {
    return () => {
      if (reqHeaders) {
        axios.delete(url + "/bookings/" + bookingId, reqHeaders).then(() => {
          alert("Successfully Deleted");
          getAndSetBookings();
        }).catch(error => {
          alert("Server error - Failed to delete");
        });
      }
    };
  };

  const columns = [
    {
      field: 'imgUrl',
      headerName: 'Thumbnail',
      width: 125,
      sortable: false,
      renderCell: (params) => (
        <img src={params.value} alt={Constants.imgAlt.userParking} className={classes.thumb} />
      ),
    },
    {
      field: 'location',
      headerName: 'Location',
      width: 350,
      renderCell: (params) => {
        console.log({ params });
        return (
          < a href={"listing-page/" + params.row.listingId} >
            {params.value}
          </a >
        );
      },
      editable: false,
    },
    {
      field: 'hostEmail',
      headerName: 'Host Email',
      width: 200,
      editable: false,
    },
    {
      field: 'startDate',
      type: 'date',
      headerName: 'Booking Start',
      width: 200,
      editable: false,
    },
    {
      field: 'endDate',
      type: 'date',
      headerName: 'Booking End',
      width: 200,
      editable: false,
    },
    {
      field: 'carAmount',
      headerName: 'Cars',
      width: 150,
      editable: false,
    },
    {
      field: 'instructions',
      headerName: 'Instructions',
      width: 550,
      editable: false,
    },
    {
      field: 'deleteId',
      headerName: 'Delete?',
      sortable: false,
      renderCell: (params) => (
        <ConfirmDialog
          onConfirm={deleteBooking(params.value, authUserHeaders)}
          dialogText="Are you sure you want to delete this booking?"
          actionNegative="Cancel"
          actionPositive="Delete"
          buttonIcon={(<DeleteIcon />)}
        />
      )
    }
  ];

  let i = 1;
  const rows = [];
  for (const row of bookings) {
    const startDate = new Date(row.startDate);
    const endDate = new Date(row.endDate);
    rows.push(
      createData(
        i,
        row.listing.location,
        row.listing.email,
        startDate,
        endDate,
        row.carAmount,
        row.listing.instructions,
        row.bookingId,
        row.listing.listingId,
        row.listing.imgUrl,
      )
    );
    i++;
  }

  return (
    <div className="App" style={{ width: '100%' }}>
      <Header />
      <Typography variant="h4" className={classes.header_text}><DriveEtaIcon color="secondary" fontSize="large" /> My Bookings <DriveEtaIcon color="secondary" fontSize="large" /></Typography>
      {loading ? <CircularProgress /> :
        <DataGrid
          className={classes.table}
          rows={rows}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          autoHeight
          autoPageSize
        />
      }
    </div>
  );
};

export default withFirebase(MyBookingsTable);
