import { makeStyles } from '@material-ui/core/styles';
import { Menu, MenuItem, Fade } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  box: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100px',
    borderRadius: '10px',
  },
  hidden: {
    display: 'none',
  },
  icon: {
    marginRight: '5px',
  }
}));

const AvatarMenu = (props) => {
  const { shown, setShown, anchorEl } = props;
  const classes = useStyles();
  const handleClose = () => {
    setShown(false);
  };
  return (
    <Menu
      keepMountedk
      open={shown}
      onClose={handleClose}
      TransitionComponent={Fade}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      transformOrigin={{ vertical: "top", horizontal: "center" }}
      anchorEl={anchorEl}
      getContentAnchorEl={null}>
      <MenuItem onClick={handleClose}>Login</MenuItem>
      <MenuItem onClick={handleClose}>Register</MenuItem>
    </Menu>
  );
};

export default AvatarMenu;
