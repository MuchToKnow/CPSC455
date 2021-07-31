import { withFirebase } from '../Firebase';
import Header from "../organisms/Header";
import axios from "axios";
import { useEffect, useState } from "react";
import config from "../../config";
import EditUserInfoForm from "../organisms/EditUserInfoForm";


const EditUserInfoPage = (props) => {
    const url = config.api.url;
    const [authUserHeaders, setAuthUserHeaders] = useState(null);

    const setAuthHeaders = () => {
        if (props.firebase.getAuthHeaders()) {
            setAuthUserHeaders(props.firebase.getAuthHeaders());
        } else {
            setTimeout(setAuthHeaders, 100);
        }
    };

    useEffect(setAuthHeaders, []);

    const updateUserInfo = () => {

    };

    // const createListing = (startDate, endDate, imgUrl, numberAvail, location, dayPrice, description, instructions, type, size) => {
    //     axios.post(url + "/listings/", {
    //         startDate: startDate.toDateString(),
    //         endDate: endDate.toDateString(),
    //         imgUrl,
    //         numberAvail,
    //         size,
    //         location,
    //         dayPrice,
    //         description,
    //         instructions,
    //         type,
    //     }, authUserHeaders).then(() => {
    //         alert("Successfully Created Listing");
    //     }).catch(err => {
    //         alert("Server error - Failed to create: " + err);
    //     });
    // };

    return (
        <div>
            <Header />
            <EditUserInfoForm
                onSubmit={updateUserInfo}
            />
        </div>
    );
};
export default withFirebase(EditUserInfoPage);
