import React, {Component} from 'react';
import {Row, Col} from 'react-bootstrap';

import '../App.css';
import Orderlist from './Orderlist';
import Saleslist from "./Saleslist";

class Home extends Component {
    render() {
        if (this.props.user.userStatus === "chef") {
            return (
                <div className="container-fluid">
                    <Row className="show-grid">
                        <Col xs={12} md={4} mdOffset={1}>
                            <div className="content-div">
                                <h1>Tilaukset</h1>
                                <Orderlist auth={this.props.auth} user={this.props.user}/>
                            </div>
                        </Col>
                        <Col xs={12} md={4} mdOffset={2}>
                            <div className="content-div">
                                <h1>Myynnit</h1>
                                <Saleslist auth={this.props.auth} user={this.props.user}/>
                            </div>
                        </Col>
                    </Row>
                </div>
            );
        }
        else {
            return (
                    <Row className="show-grid">
                        <Col xs={12} sm={6} md={5} mdOffset={1}>
                            <div className="content-div">
                                <h1>Myynnit</h1>
                                <Saleslist auth={this.props.auth} user={this.props.user}/>
                            </div>
                        </Col>
                        <Col xs={12} sm={6} md={5}>
                            <div className="content-div">
                                <h1>Tilaukset</h1>
                                <Orderlist auth={this.props.auth} user={this.props.user}/>
                            </div>
                        </Col>
                    </Row>
            );
        }
    }
}

export default Home;