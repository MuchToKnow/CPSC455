import React from 'react';
import '../../styling/Header.css';
import SearchIcon from "@material-ui/icons/Search";
import { Box } from "@material-ui/core";
import InputBase from '@material-ui/core/InputBase';
import AvatarButton from "../molecules/AvatarButton";
import logo from "../../logo_transparent.png";
import debounce from 'debounce';

function Header(props) {
    const onChange = debounce((event) => {
        props.onSearchChange(event.target.value);
    }, 150);
    return (
        <Box className='header' bgcolor="primary.main">
            <a className="img_logo_icon" href="/app"><img className="img_logo_icon" src={logo} alt="Logo" /></a>
            <Box className='header_center' bgcolor="primary.light">
                <InputBase className='input_text' onChange={onChange} />
                <SearchIcon />
            </Box>

            <Box className='header_right'>
                <AvatarButton />
            </Box>
        </Box>
    );
};

export default Header;
