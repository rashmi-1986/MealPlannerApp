import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import VerificationPage from './pages/VerificationPage';


const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/register" component={RegisterPage} />
        <Route path="/verify" component={VerificationPage} />
        {/* Add more routes as needed */}
      </Switch>
    </Router>
  );
};


export default App;