import React from 'react';
import '../../styling/Banner.css';
import { Button, Box, Typography } from "@material-ui/core";
import Typed from 'typed.js';

function Landing() {
    const typed = React.useRef(null);
    const el = React.useRef(null);
    React.useEffect(() => {
        const options = {
            strings: [
                'better',
                'faster',
                'cheaper',
                'easier'
            ],
            typeSpeed: 50,
            backSpeed: 50,
            startDelay: 1000,
            backDelay: 1000,
            showCursor: false,
            loop: true,
            smartBackspace: true,
        };
        typed.current = new Typed(el.current, options);
        return () => {
            typed.current.destroy();
        };
    }, []);
    return (
        <Box className='banner' >
            <Box className='banner_container' bgcolor="tertiary.main">
                <Box className='banner_info'>
                    <Typography variant="h3" className="banner_text">Park <span ref={el} /></Typography>
                    <Typography variant="h5" className="banner_text">Park now at spots that were never offered, and support your community</Typography>
                    <Button variant='contained' href="/app" color="primary"> Explore Parking Near You</Button>
                </Box>
            </Box>
        </Box>
    );
};
export default Landing;
