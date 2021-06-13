import { Menu, MenuItem, Fade, Box } from "@material-ui/core";
import RegisterForm from '../organisms/RegisterForm';
import { useState } from 'react';

const AvatarMenu = (props) => {
  const { shown, setShown, anchorEl } = props;
  const [registerOpen, setRegisterOpen] = useState(false);

  const handleOpenRegister = () => {
    setShown(false);
    setRegisterOpen(true);
  };

  const handleClose = () => {
    setShown(false);
  };

  return (
    <Box>
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
        <MenuItem onClick={handleOpenRegister}>Register</MenuItem>
      </Menu>
      <RegisterForm open={registerOpen} setOpen={setRegisterOpen} />
    </Box>
  );
};

export default AvatarMenu;
