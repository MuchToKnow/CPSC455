import './styling/App.css';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Landing from './components/pages/Landing';
import Login from './components/organisms/Login';
import MainApp from './components/pages/MainApp';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/app">
          <MainApp />
        </Route>
        <Route exact path="/">
          <Landing />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
