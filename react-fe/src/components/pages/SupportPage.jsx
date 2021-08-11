import { withFirebase } from '../Firebase';
import Header from "../organisms/Header";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import BusinessIcon from '@material-ui/icons/Business';
import EmailIcon from '@material-ui/icons/Email';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import {Box, Typography} from "@material-ui/core";
import '../../styling/ListingPage.css';

const EditUserInfoPage = () => {

    return (
        <div>
            <Header />
            <Box className="supportPage">

                <List>
                    <ListItem>
                        <Typography variant="h4">
                            Contact Us!
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <ListItemAvatar >
                            <Avatar >
                                <ContactPhoneIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText className="supportInfo" color="secondary" primary="Phone" secondary="6041234567" />
                    </ListItem>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <EmailIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText className="supportInfo" primary="Email" secondary="work@email.com" />
                    </ListItem>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <BusinessIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText className="supportInfo" primary="Mailing Address" secondary="123 UBC, Vancouver, BC V6T 1Z4" />
                    </ListItem>
                </List>
            </Box>

        </div>
    );
};
export default withFirebase(EditUserInfoPage);
