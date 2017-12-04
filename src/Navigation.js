import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';

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
        <MenuItem href="/logout">Kirjaudu ulos</MenuItem>
        </NavDropdown>
    </Nav>
);

class Navigation extends Component {
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
                        <NavItem href="/documents">Uusi myynti-ilmoitus</NavItem>
                        <NavItem href="/test">Uusi tilaus</NavItem>
                    </Nav>
                    { fakeAuth.isAuthenticated === false ? <IsGuest /> : <IsUser /> }
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default Navigation;