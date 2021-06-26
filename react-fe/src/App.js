import './styling/App.css';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Landing from './components/pages/Landing';
import MainApp from './components/pages/MainApp';
import ListingPageExample from './components/pages/ListingPageExample';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/app">
          <MainApp />
        </Route>
        <Route exact path="/">
          <Landing />
        </Route>

        //change this route later
        <Route exact path="/listing-page-example">
          <ListingPageExample />
        </Route>

      </Switch>
    </Router>
  );
}

export default App;
