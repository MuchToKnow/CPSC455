import './styling/App.css';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Landing from './components/pages/Landing';
import MainApp from './components/pages/MainApp';
import ListingPage from './components/pages/ListingPage';
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
          <ListingPage />
        </Route>

      </Switch>
    </Router>
  );
}

export default App;
