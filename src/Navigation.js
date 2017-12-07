import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link, Redirect, withRouter} from 'react-router-dom';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';

// const fakeAuth = {
//     isAuthenticated: false,
//     authenticate(cb) {
//         this.isAuthenticated = true
//         setTimeout(cb, 100) // fake async
//     },
//     signout(cb) {
//         this.isAuthenticated = false
//         setTimeout(cb, 100) // fake async
//     }
// }

const IsGuest = () => (
    <Nav pullRight>
        <NavItem href="/login">Kirjaudu sisään</NavItem>
        <NavItem href="/register">Rekisteröidy</NavItem>
    </Nav>
);

const IsUser = () => (
    <Nav pullRight>
        <NavDropdown title="Asetukset" id="basic-nav-dropdown">
            <MenuItem href="/profile">Profiili</MenuItem>
            <MenuItem divider/>
            <MenuItem href="/logout"><LogOutButton {...this.props} callback={this.logout}/></MenuItem>
        </NavDropdown>
    </Nav>
);

class LogOutButton extends Component {
    state = {id:'',name:'', lastName:'', phoneNumber:'',
        location:'',presentation:'',userStatus:'',
        email:'',password:''};

    logout = () => {
        this.props.callback(this.state);
    }

    render() {
        return (
            <div>
                <span onClick={this.logout}>Kirjaudu ulos</span>
            </div>
        )
    }
}

class Navigation extends Component {

    logout = (e) => {
        this.props.callback(e)
    }

    render() {
        return (
            <Navbar staticTop>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">Neighborfood</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle/>
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavItem><Link to="/addorder">Uusi myynti-ilmoitus</Link></NavItem>
                        <NavItem><Link to="/test">Uusi tilaus</Link></NavItem>
                        <NavItem><Link to="/profile">Profile</Link></NavItem>
                    </Nav>
                    {/*{this.props.auth === false ? " " : <LogOutButton {...this.props} callback={this.logout}/>}*/}
                    {this.props.auth === false ? <IsGuest/> : <IsUser {...this.props} callback={this.logout}/>}
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default Navigation;