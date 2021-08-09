import { Menu, MenuItem, Fade, Box } from "@material-ui/core";
import { withFirebase } from '../Firebase';

const AvatarMenu = (props) => {
  const { shown, setShown, anchorEl, firebase } = props;

  const handleLogout = () => {
    firebase.firebaseSignOut();
    setShown(false);
    window.location.href = "/";
  };

  const redirectToMyListings = () => {
    window.location.href = "/myListings";
  };

  const redirectToCreateListing = () => {
    window.location.href = "/createListing";
  };

  const redirectToEditInfo = () => {
    window.location.href = "/editUserInfo";
  };

  const redirectToMyBookings = () => {
    window.location.href = "/mybookings";
  };

  const redirectToSupport = () => {
    window.location.href = "/support";
  };

  const handleClose = () => {
    setShown(false);
  };

  return (
    <Box>
      <Menu
        keepMounted
        open={shown}
        onClose={handleClose}
        TransitionComponent={Fade}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        anchorEl={anchorEl}
        getContentAnchorEl={null}>
        <MenuItem onClick={redirectToEditInfo}>Edit Info</MenuItem>
        <MenuItem onClick={redirectToCreateListing}>Create Listing</MenuItem>
        <MenuItem onClick={redirectToMyListings}>My Listings</MenuItem>
        <MenuItem onClick={redirectToMyBookings}>My Bookings</MenuItem>
        <MenuItem onClick={redirectToSupport}>Support</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
      {/*<CreateListingPage open={createListingOpen} setOpen={setCreateListingOpen} />*/}
    </Box >
  );
};

export default withFirebase(AvatarMenu);
