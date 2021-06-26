import React from 'react';
import '../../styling/Header.css';
import SearchIcon from "@material-ui/icons/Search";
import { Box } from "@material-ui/core";
import InputBase from '@material-ui/core/InputBase';
import AvatarButton from "../molecules/AvatarButton";
import HouseIcon from '@material-ui/icons/House';


function Header() {
    return (
        <Box className='header' bgcolor="primary.main">
            <HouseIcon className="header_icon" fontSize="large"/>

            <Box className='header_center' bgcolor="primary.light">
                <InputBase />
                <SearchIcon />
            </Box>

            <Box className='header_right'>
                <AvatarButton />
            </Box>
        </Box>
    );
}

export default Header;
