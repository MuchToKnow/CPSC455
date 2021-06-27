import React from 'react';
import '../../styling/Header.css';
import SearchIcon from "@material-ui/icons/Search";
import { Box } from "@material-ui/core";
import InputBase from '@material-ui/core/InputBase';
import AvatarButton from "../molecules/AvatarButton";
import logo from "../../logo_transparent.png";


function Header() {
    return (
        <Box className='header' bgcolor="primary.main">
            <img className="img_logo_icon" src={logo} alt="Logo"/>
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
