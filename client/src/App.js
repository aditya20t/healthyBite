import React, { Fragment, useEffect } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Landing from './components/Landing/Landing';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Alert from './components/Layout/Alert';
// Redux
import { Provider } from 'react-redux';
import store from './store';
import{ loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

if(localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
      <Fragment>
        <Navbar />
        <Route exact path='/' component={Landing} />
        <section className="container">
          <Alert />
          <Switch>
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component= { Register } />
          </Switch>
        </section>
      </Fragment>
      </Router>
    </Provider>
    
    
  );
}

export default App;
