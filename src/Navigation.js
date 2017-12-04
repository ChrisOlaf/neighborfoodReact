import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';


class Navigation extends Component {
    render() {
        return (
            <Navbar staticTop>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">Reititysesimerkki</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle/>
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavItem href="/documents">Uusi myynti-ilmoitus</NavItem>
                        <NavItem href="/test">Uusi tilaus</NavItem>
                        {/*<NavDropdown title="Esimerkkejä - alisivu" id="basic-nav-dropdown">*/}
                            {/*<MenuItem href="/samples/second/42">Esimerkki/kaksi, id: 42</MenuItem>*/}
                            {/*<MenuItem href="/samples/second/105">Esimerkki/kaksi, id: 105</MenuItem>*/}
                            {/*<MenuItem divider/>*/}
                            {/*<MenuItem href="/samples/nosuchaddress">Not found alisivu</MenuItem>*/}
                        {/*</NavDropdown>*/}
                    </Nav>
                    <Nav pullRight>
                        <NavItem href="/nosuchaddress">Rekisteröidy</NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default Navigation;