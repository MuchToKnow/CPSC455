import React from 'react';
import '../../styling/Banner.css';
import { Button } from "@material-ui/core";

function Landing() {
    return (
        <div className='banner'>
            <div className='banner_info'>
                <h1>Park cheaper and more conveniently!</h1>
                <h5>Park now at spots that were never offered, and support your community</h5>
                <Button variant='contained' href="/app" color="primary"> Explore Parking Near You</Button>
            </div>
        </div>
    );
}
export default Landing;
