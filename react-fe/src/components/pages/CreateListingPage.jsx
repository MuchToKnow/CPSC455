import { withFirebase } from '../Firebase';
import Header from "../organisms/Header";
import ListingForm from '../organisms/ListingForm';
import axios from "axios";
import {useEffect, useState} from "react";
import config from "../../config";

const CreateListingPage = (props) => {
    const url = config.api.url
    const [authUserHeaders, setAuthUserHeaders] = useState(null);

    useEffect(() => {
        // Sets authed user when firebase loads current user
        props.firebase.auth.onAuthStateChanged(authUser => {
            if (authUser) {
                authUser.getIdToken().then((token) => {
                    const reqHeaders = {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    };
                    setAuthUserHeaders(reqHeaders);
                });
            } else {
                setAuthUserHeaders(null);
            }
        });
    }, [props.firebase.auth, url]);

    const createListing = (startDate, endDate, imgUrl, numberAvail, location, dayPrice, instructions, type, size) => {
        axios.post(url + "/listings/", {
            startDate: startDate.toDateString(),
            endDate: endDate.toDateString(),
            imgUrl,
            numberAvail,
            size,
            location,
            dayPrice,
            instructions,
            type,
        }, authUserHeaders).then(() => {
            alert("Successfully Created Listing");
        }).catch(error => {
            alert("Server error - Failed to create");
        });
    };

    return (
        <div>
            <Header />
            <ListingForm
                onSubmit={createListing}
            />
        </div>
    );
};
export default withFirebase(CreateListingPage);
