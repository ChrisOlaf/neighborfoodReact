import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import {Grid} from 'react-bootstrap';

import Navigation from './Navigation';
import Home from './components/Home';
import AddO from './components/AddOrder';
import AddS from './components/AddSale';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import Test from './components/Test';
import NotFound from './NotFound';

import './App.css';


const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={(props) => (
        this.state.auth === true
            ? <Component {...props} />
            : <Redirect to='/login'/>
    )}/>
)

var cachedUser = "";

class App extends Component {

    // Verifies user login on a callback, stores user to session and grants access.
    verifyUser = (e) => {
        window.sessionStorage.setItem('storedUser', JSON.stringify(e));
        this.setState({user: e});
        this.state.user.id === null || this.state.user.id === undefined ? this.setState({auth: false}) : this.setState({auth: true});
        // console.log(this.state);
    }
    // Verifies user logout on a callback and clears session. Reverts authentication to guest-status.
    logoutUser = () => {
        this.setState({user: [], auth: false});
        window.sessionStorage.clear();
        // console.log("App.logoutUser: Käyttäjä on kirjautunut ulos.");
        // console.log(this.state);
    }

    constructor(props) {
        super(props);
        this.state = {auth: false};
        this.InitialState();
        // console.log("App.constructorin tarkistus!");
    }

    // Initializing state for App.js. If nothing is stored in session, defaults to guest-user.
    InitialState() {
        cachedUser = window.sessionStorage.getItem('storedUser');
        const x = this;
        if (cachedUser) {
            x.state = {user: JSON.parse(cachedUser), auth: true};
            // console.log("App.initialstate haki käyttäjän storagesta!");
            // console.log(cachedUser) // Checking what is stored in the session
        }
        else {
            x.state = {user: [], auth: false};
            // console.log("App.initialstate ei hakenut käyttäjää storagesta!");
        }
    }

    // Render navigation and route content.
    render() {
        // console.log("App.js tarkistaa tilaa tässä moi!");
        console.log(cachedUser);
        console.log(this.state);
        return (
            <Router>
                <div className="App">
                    <Navigation auth={this.state.auth} user={this.state.user} callback={this.logoutUser}/>
                    <Grid>
                        <Switch>
                            <Route exact path='/' render={(props) =>
                                (<Home {...props} auth={this.state.auth} user={this.state.user}/>)}/>
                            <Route exact path='/addsale' render={(props) =>
                                (<AddS {...props} auth={this.state.auth} user={this.state.user}/>)}/>
                            <Route exact path='/addorder' render={(props) =>
                                (<AddO {...props} auth={this.state.auth} user={this.state.user}/>)}/>
                            <Route exact path='/test' render={(props) =>
                                (<Test {...props} auth={this.state.auth} user={this.state.user}/>)}/>
                            <Route exact path='/login' render={(props) =>
                                (<Login {...props} user={this.state.user} callback={this.verifyUser}/>)}/>
                            <Route exact path='/register' render={(props) =>
                                (<Register {...props} auth={this.state.auth} user={this.state.user}/>)}/>
                            <Route exact path='/profile' render={(props) =>
                                (<Profile {...props} auth={this.state.auth} user={this.state.user}/>)}/>
                            {/*<Route exact name="index" path="/" component={Home}/>*/}
                            {/*<Route path="/login" callback={this.verifyUser} component={Login}/>*/}
                            {/*<Route path="/test" component={Test}/>*/}
                            {/*<Route path="/register" component={Register}/>*/}
                            {/*<Route path="/profile" component={Profile}/>*/}
                            <Route component={NotFound}/>
                        </Switch>
                    </Grid>
                    <hr/>
                </div>
            </Router>
        );
    }
}


export default App;
