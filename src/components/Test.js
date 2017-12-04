import React, { Component } from 'react';
import {Jumbotron} from 'react-bootstrap';
import '../App.css';

class Test extends Component {
    render() {
        return (
            <div className="Home">
                <Jumbotron>
                    <h1>Router esimerkkejä</h1>
                    <p>React router v4 tyylin reititystä</p>
                </Jumbotron>
                <p>Hieman esimerkkejä käyttäen React router v4,
                    ja vähän React Bootstrapiä bonuksena.
                </p>
            </div>
        );
    }
}

export default Test;