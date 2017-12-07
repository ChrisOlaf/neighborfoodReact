import React, { Component } from 'react';
import {BrowserRouter as Redirect} from 'react-router-dom';
import Orderlist from './Orderlist';
import '../App.css';

class AddSale extends React.Component {
    render() {
        return (
            <div className="Home">
                <div className="ordersdiv">
                    <h1>Lisää myynti</h1>
                    <Orderlist />
                </div>
            </div>
        );
    }
}

export default AddSale;