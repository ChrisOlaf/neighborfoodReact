import React, { Component } from 'react';
import '../App.css';
import Orderlist from './Orderlist';
import Saleslist from "./Saleslist";

class Home extends Component {
    render() {
        return (
            <div className="Home">
                <div className="ordersdiv">
                    <h1>Tilaukset</h1>
                    <Orderlist />
                </div>
                <div className="salesdiv">
                    <h1>Myynnit</h1>
                    <Saleslist />
                </div>
            </div>
        );
    }
}

export default Home;