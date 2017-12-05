import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Grid } from 'react-bootstrap';
import Navigation from './Navigation';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import Test from './components/Test';
import NotFound from './NotFound';

import './App.css';



const fakeAuth = {
    isAuthenticated: false,
    authenticate(cb) {
        this.isAuthenticated = true
        setTimeout(cb, 100) // fake async
    },
    signout(cb) {
        this.isAuthenticated = false
        setTimeout(cb, 100) // fake async
    }
}

// const PrivateRoute = ({ component: Component, ...rest }) => (
//     <Route {...rest} render={(props) => (
//         fakeAuth.isAuthenticated === true
//             ? <Component {...props} />
//             : <Redirect to='/login' />
//     )} />
// )

class App extends Component {
// = appProps => (

state={user:[]};

// var isLoggedIn === false;

verifyUser = (e) => {
    this.setState({user: e});
    // this.state.user.id = null ?  :
}

render () {
    return(
    <Router>
        <div className="App">
            <Navigation auth={fakeAuth}/>
            <Grid>
                <Switch>
                    <Route exact name="index" path="/" component={Home} />
                    <Route path="/test" component={Test}/>
                    <Route path="/login" component={Login} callback={this.verifyUser}/>
                    <Route path="/register" component ={Register}/>
                    <Route path="/profile" component ={Profile}/>
                    <Route component={NotFound} />
                </Switch>
            </Grid>
            <hr/>
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
);}}


export default App;
