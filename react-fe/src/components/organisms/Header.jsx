import React from 'react';
import '../../styling/Header.css';
import SearchIcon from "@material-ui/icons/Search";
import LanguageIcon from "@material-ui/icons/Language";
import { Box } from "@material-ui/core";
import AvatarButton from "../molecules/AvatarButton";


function Header() {
    return (
        <Box className='header'>
            {/*logo image goes here*/}
            <img
                className="header_icon"
                src="logo_tbd"
                alt=""
            />

            <div className='header_center'>
                <input type="text" />
                <SearchIcon />
            </div>

            <div className='header_right'>
                <p>List Your Parking Space</p>
                <LanguageIcon />
                <AvatarButton />
            </div>
        </Box>
    );
}

export default Header;
