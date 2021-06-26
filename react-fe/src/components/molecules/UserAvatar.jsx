import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: '5px',
  }
}));

const UserAvatar = () => {
  const classes = useStyles();
  return (
    <Avatar alt="Remy Sharp" src="https://lh3.googleusercontent.com/proxy/DU111CWOcaaNYzKuERlv5tUBezyQCmYMmoIbFXy9H52c7tqcFvYGaJnvrk7A1mezN3rjJ9qtW1PCHDprZ5TQj_NRqg" />
  );
};

export default UserAvatar;
