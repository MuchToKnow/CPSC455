import { withFirebase } from '../Firebase';
import Header from "../organisms/Header";
import ListingForm from '../organisms/ListingForm';

const CreateListingPage = (props) => {
    // TODO: Pass backend call onSubmit fn to ListingForm
    return (
        <div>
            <Header />
            <ListingForm />
        </div>
    );
};
export default withFirebase(CreateListingPage);
