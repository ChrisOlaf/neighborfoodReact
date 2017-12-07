import React, { Component } from 'react';
import {BrowserRouter as Redirect} from 'react-router-dom';
import Orderlist from './Orderlist';
import AddOrder from './AddOrder';
import '../App.css';

class Test extends React.Component {
    render() {
        return (
            <div className="Home">
                <div className="ordersdiv">
                    <h1>Tilaukset</h1>
                    <AddOrder/>
                    <br/>
                    <Orderlist />
                </div>
            </div>
        );
    }
}

export default Test;