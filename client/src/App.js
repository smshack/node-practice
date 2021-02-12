import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import LandingPage from './components/views/LandingPage/LandingPage'
import LoginPage from './components/views/LoginPage/LoginPage'
import RegisterPage from './components/views/RegisterPage/RegisterPage'

import NavBar from './components/views/NavBar/NavBar'
import Footer from './components/views/Footer/Footer'

function App() {
  return (
      <Router>
        <div>
          <NavBar/>
          <Switch>
            <Route exact path="/landingpage" component={LandingPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
          </Switch>
          <Footer/>
        </div>
      </Router>
  );
}

export default App;
