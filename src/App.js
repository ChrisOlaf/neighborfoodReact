import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Grid } from 'react-bootstrap';
import Navigation from './Navigation';
import Home from './components/Home';
import Register from './components/Register';
import Test from './components/Test';
import NotFound from './NotFound';

import logo from './logo.svg';
import './App.css';

const App = appProps => (
    <Router>
        <div className="App">
            <Navigation/>
            <Grid>
                <Switch>
                    <Route exact name="index" path="/" component={Home} />
                    <Route path="/test" component={Test}/>
                    {/*<Route exact path="/documents" component={Documents} />*/}
                    {/*<Route path="/documents/:_id" component={ViewDocument} />*/}
                    <Route component={NotFound} />
                </Switch>
            </Grid>
            <hr/>
            <Register/>
        </div>
    </Router>
  // render() {
  //   return (
  //     <div className="App">
  //       {/*<header className="App-header">*/}
  //         {/*<img src={logo} className="App-logo" alt="logo" />*/}
  //         {/*<h1 className="App-title">Welcome to React</h1>*/}
  //       {/*</header>*/}
  //       {/*<p className="App-intro">*/}
  //       {/*</p>*/}
  //     </div>
  //   );
  // }
);

export default App;
