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
import Auth from './hoc/auth'
import NavBar from './components/views/NavBar/NavBar'
import Footer from './components/views/Footer/Footer'

function App() {
  return (
      <Router>
        <div>
          <NavBar/>
          <Switch>
            <Route exact path="/landingpage" component={Auth(LandingPage,null,true)} />
            <Route path="/login" component={Auth(LoginPage, false)} />
            <Route path="/register" component={Auth(RegisterPage,false)} />
          </Switch>
          <Footer/>
        </div>
      </Router>
  );
}

export default App;
