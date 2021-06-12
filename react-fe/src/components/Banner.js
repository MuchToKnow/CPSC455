import React, {useState} from 'react'
import './Banner.css'
import {Button} from "@material-ui/core";
import Search from './Search'

function Banner() {
    const [showSearch, setShowSearch] = useState(false);

    return (
        <div className='banner'>
            <div className='banner_search'>
                {showSearch && <Search />}
                <Button onClick={() => setShowSearch(!showSearch)} className='banner_searchButton' variant='outlined'>
                    {showSearch ? "Hide" : "Search Dates"}
                </Button>
            </div>
            <div className='banner_info'>
                <h1>Park cheaper and more conveniently!</h1>
                <h5>Park now at spots that were never offered, and support your community</h5>
                <Button variant'outlined'> Explore Parking Near You</Button>
            </div>
        </div>
    )
}
export default Banner