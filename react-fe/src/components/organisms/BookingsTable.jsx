import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withFirebase } from '../Firebase';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import config from '../../config';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
    marginTop: theme.spacing(2),
  },
}));

function createData(email, startDate, endDate, carAmount) {
  return { email, startDate, endDate, carAmount };
}

const BookingsTable = (props) => {
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

  useEffect(setAuthHeaders, [props.firebase, setAuthHeaders]);

  useEffect(() => {
    if (authUserHeaders) {
      axios.get(url + "/bookings/byListing/" + props.bookingId, authUserHeaders).then((res) => {
        setBookings(res.data);
        setLoading(false);
      }).catch(() => {
        setLoading(false);
      });
    }
  }, [authUserHeaders, props.bookingId, url]);

  const rows = [];
  for (const row of bookings) {
    console.log(row);
    const startDate = new Date(row.startDate);
    const endDate = new Date(row.endDate);
    rows.push(createData(row.email, startDate.toDateString(), endDate.toDateString(), row.carAmount));
  }

  return (
    <div className={classes.table}>
      {loading ? <CircularProgress /> :
        < TableContainer component={Paper} >
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Customer Email</TableCell>
                <TableCell align="right">Booking Start</TableCell>
                <TableCell align="right">Booking End</TableCell>
                <TableCell align="right">Number of Cars</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.email}
                  </TableCell>
                  <TableCell align="right">{row.startDate}</TableCell>
                  <TableCell align="right">{row.endDate}</TableCell>
                  <TableCell align="right">{row.carAmount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer >
      }
    </div>
  );
};

export default withFirebase(BookingsTable);
