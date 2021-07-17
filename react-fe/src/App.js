import './styling/App.css';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Landing from './components/pages/Landing';
import MainApp from './components/pages/MainApp';
import ListingPageExample from './components/pages/ListingPageExample';
import MyListingsPage from './components/pages/MyListingsPage';

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
        <Route path="/listing-page-example/:listingId">
          <ListingPageExample />
        </Route>

      </Switch>
    </Router>
  );
}

export default App;
