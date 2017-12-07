import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import LogOutButton from './components/LogOutButton';


// Right hand side navigation options when user isn't logged in
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

// Right hand side navigation options when user is logged in
const IsUser = (props) => (
    <Nav pullRight>
        <NavDropdown title="Asetukset" id="basic-nav-dropdown">
            <LinkContainer to="/profile">
            <MenuItem>Profiili</MenuItem>
            </LinkContainer>
            <MenuItem divider/>
            <LinkContainer to="/">
            <MenuItem><LogOutButton {...props} callback={props.callback}/></MenuItem>
            </LinkContainer>
        </NavDropdown>
    </Nav>
);

class Navigation extends Component {


    // Return logout callback to App.js
    logout = (e) => {
        this.props.callback(e)
    };


    // Render navbar with brand-link on far left, followed by links for new sale and new order. On right content will be rendered based on user authentication status.
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
                        <LinkContainer to="/addsale">
                        <NavItem eventKey={1}>Uusi myynti-ilmoitus</NavItem>
                        </LinkContainer>
                        <LinkContainer to="/addorder">
                        <NavItem eventKey={2}>Uusi tilaus</NavItem>
                        </LinkContainer>
                    </Nav>
                    {this.props.auth === true ? <IsUser {...this.props} callback={this.logout}/> : <IsGuest/>}
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default Navigation;