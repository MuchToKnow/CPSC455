import React from 'react'
import './Header.css'
import SearchIcon from "@material-ui/icons/Search"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import LanguageIcon from "@material-ui/icons/Language"
import { Avatar} from "@material-ui/core";


function Header() {
    return (
        <div className='header'>
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
                <ExpandMoreIcon />
                <Avatar />
            </div>
        </div>
    )
}

export default Header