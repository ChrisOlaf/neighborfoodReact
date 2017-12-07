import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link, Redirect, withRouter} from 'react-router-dom';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import LogOutButton from './components/LogOutButton';

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
        <LinkContainer to="/login">
        <NavItem eventKey={1}>Kirjaudu sisään</NavItem>
        </LinkContainer>
        <LinkContainer to="/register">
        <NavItem eventKey={2}>Rekisteröidy</NavItem>
        </LinkContainer>
    </Nav>
);

const IsUser = (props) => (
    <Nav pullRight>
        <NavDropdown eventKey={1} title="Asetukset" id="basic-nav-dropdown">
            <LinkContainer to="/profile">
            <MenuItem eventKey={1.1}>Profiili</MenuItem>
            </LinkContainer>
            <MenuItem divider/>
            <LinkContainer to="/">
            <MenuItem eventKey={1.2}><LogOutButton {...props} callback={props.callback}/></MenuItem>
            </LinkContainer>
        </NavDropdown>
    </Nav>
);

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
                        <LinkContainer to="/addorder">
                        <NavItem eventKey={1}>Uusi myynti-ilmoitus</NavItem>
                        </LinkContainer>
                        <LinkContainer to="/test">
                        <NavItem eventKey={2}>Uusi tilaus</NavItem>
                        </LinkContainer>
                        <LinkContainer to="/profile">
                        <NavItem eventKey={3}>Profile</NavItem>
                        </LinkContainer>
                    </Nav>
                    {/*{this.props.auth === false ? " " : <LogOutButton {...this.props} callback={this.logout}/>}*/}
                    {this.props.auth === true ? <IsUser {...this.props} callback={this.logout}/> : <IsGuest/>}
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default Navigation;