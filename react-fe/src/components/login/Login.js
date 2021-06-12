import React, { Component } from "react";
import firebase from 'firebase';
import StyledFirebaseUi from 'react-firebaseui/StyledFirebaseAuth'
import 'whatwg-fetch'
import RegisterForm from "../molecules/RegisterForm";

firebase.initializeApp({
    apiKey: 'to_be_filled',
    authDomain: 'to_be_filled'
})
var uiConfig = {
    callbacks: {
        signInSuccessWithAuthResult: function(authResult, redirectUrl) {
            // TODO: add api call to save user to backend
            return true;
        },
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'redirect',
    signInSuccessUrl: '/',
    signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ],
};

class Login extends Component {
    constructor(props) {
        super(props);

        this.state={
            isAuthenticated : false
        }
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            this.setState({isAuthenticated : !this.state.isAuthenticated})
        })
    }

    render() {
        return (
            <>
                <h3>Login</h3>
                <StyledFirebaseUi
                    uiConfig={uiConfig}
                    firebaseAuth={firebase.auth()}
                />
            </>
        )
    }
}
export default Login;