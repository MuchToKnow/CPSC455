import { withFirebase } from '../Firebase';
import Header from "../organisms/Header";
import EditUserInfoForm from "../organisms/EditUserInfoForm";


const EditUserInfoPage = (props) => {
    return (
        <div>
            <Header />
            <EditUserInfoForm />
        </div>
    );
};
export default withFirebase(EditUserInfoPage);
