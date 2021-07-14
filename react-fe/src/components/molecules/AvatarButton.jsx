import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Button, Box } from "@material-ui/core";
import AvatarMenu from './AvatarMenu';
import React, { useState } from 'react';
import { FirebaseContext } from '../Firebase';

const useStyles = makeStyles((theme) => ({
  btn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: '20px'
  },
  icon: {
    marginRight: '5px',
  }
}));

const AvatarButton = () => {
  const classes = useStyles();
  const [shown, setShown] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const onMenuBtnClick = (event) => {
    setShown(!shown);
    setAnchorEl(event.currentTarget);
  };
  return (
    <Box>
      <Button ref={anchorEl} className={classes.btn} onClick={onMenuBtnClick}>
        <MenuIcon className={classes.icon} />
        <Avatar />
      </Button>
      <AvatarMenu anchorEl={anchorEl} shown={shown} setShown={setShown} />
    </Box>
  );
};

export default AvatarButton;
