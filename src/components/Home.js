import React, {Component} from 'react';
import {Row, Col} from 'react-bootstrap';

import '../App.css';
import Orderlist from './Orderlist';
import Saleslist from "./Saleslist";

class Home extends Component {
    render() {
        if (this.props.user.userStatus === "chef") {
            return (
                <Row className="home-row">
                    <Col xs={12} sm={6} md={5} mdOffset={1} lg={4} lgOffset={2}>
                        <div className="content-div">
                            <Row className="content-header">
                                <Col sm={10} smOffset={1}>
                                    <h1>Tilaukset</h1>
                                </Col>
                            </Row>
                            <Orderlist auth={this.props.auth} user={this.props.user}/>
                        </div>
                    </Col>
                    <Col xs={12} sm={6} md={5} lg={4}>
                        <div className="content-div">
                            <Row className="content-header">
                                <Col sm={10} smOffset={1}>
                                    <h1>Myynnit</h1>
                                </Col>
                            </Row>
                            <Saleslist auth={this.props.auth} user={this.props.user}/>
                        </div>
                    </Col>
                </Row>
            );
        }
        else {
            return (
                <Row className="home-row">
                    <Col xs={12} sm={6} md={5} mdOffset={1} lg={4} lgOffset={2}>
                        <div className="content-div">
                            <h1>Myynnit</h1>
                            <Saleslist auth={this.props.auth} user={this.props.user}/>
                        </div>
                    </Col>
                    <Col xs={12} sm={6} md={5} lg={4}>
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