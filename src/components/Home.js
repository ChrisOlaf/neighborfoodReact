import React, { Component } from 'react';
import '../App.css';
import Orderlist from './Orderlist';
import Saleslist from "./Saleslist";

class Home extends Component {
    render() {
        return (
            <div className="Home">
                <div className="ordersDiv">
                    <h1>Tilaukset</h1>
                    <Orderlist auth={this.props.auth} user={this.props.user}/>
                </div>
                <div className="salesDiv">
                    <h1>Myynnit</h1>
                    <Saleslist auth={this.props.auth} user={this.props.user}/>
                </div>
            </div>
        );
    }
}

export default Home;