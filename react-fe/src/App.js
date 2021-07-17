import './styling/App.css';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Landing from './components/pages/Landing';
import MainApp from './components/pages/MainApp';
import ListingPageExample from './components/pages/ListingPageExample';
import MyListingsPage from './components/pages/MyListingsPage';
import CreateListingPage from "./components/pages/CreateListingPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Landing />
        </Route>
        <Route exact path="/app">
          <MainApp />
        </Route>
        <Route exact path="/myListings">
          <MyListingsPage />
        </Route>

        //change this route later
        <Route exact path="/listing-page-example">
          <ListingPageExample />
        </Route>

        <Route exact path="/createListing">
          <CreateListingPage />
        </Route>

      </Switch>
    </Router>
  );
}

export default App;
