import React, {useState} from 'react';
import '../../styling/Banner.css';
import { Button, Box, Typography, MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import Typed from 'typed.js';
import logo from "../../logo_long_transparent.png";
import RegisterForm from "../organisms/RegisterForm";
import LoginForm from "../organisms/LoginForm";

function Landing() {

    const typed = React.useRef(null);
    const el = React.useRef(null);
    const [registerOpen, setRegisterOpen] = useState(false);
    const [loginOpen, setLoginOpen] = useState(false);

    const handleOpenRegister = () => {
        setRegisterOpen(true);
    };

    const handleOpenLogin = () => {
        setLoginOpen(true);
    };
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
    const theme = createMuiTheme({
        palette: {
            primary: {
                main: "#97a6ec"
            }
        },
        typography: {
            body1: {
                fontFamily: "Comic Sans"
            }
        }
    });
    return (
        <div className="backgroundColor">
            <Box className='banner_container' bgcolor="tertiary">
            <Box className='banner_info'>
                <img className="landing_icon" src={logo} alt="Logo"/>
                <Typography variant="h3" className="banner_text">Park <span ref={el} /></Typography>
                <Typography variant="h5" className="banner_text">Park now at spots that were never offered, and support your community</Typography>
                <MuiThemeProvider theme={theme}>
                    <a className="button_padding"><Button variant='contained' href="/app" color="primary"> Explore Parking Near You</Button></a>
                    <a className="button_padding"><Button variant='contained' onClick={handleOpenLogin} color="primary"> Login </Button></a>
                    <a className="button_padding"><Button variant='contained' onClick={handleOpenRegister} color="primary"> Register Now! </Button></a>
                </MuiThemeProvider>
            </Box>
            <RegisterForm open={registerOpen} setOpen={setRegisterOpen} />
            <LoginForm open={loginOpen} setOpen={setLoginOpen} />
        </Box>
        </div>
    );
};
export default Landing;
