import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Row, Col} from 'react-bootstrap';

import '../App.css';
import AcceptResponse from "./AcceptResponse";

var time = undefined;

class Orders extends Component {

    constructor(props) {
        super(props);
        this.state = {
            content: '',
            order_id: '',
            isFormVisible: false,
            responses: [],
            requirements: []
        };
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.goAndFetchData();
        this.getRequirements();
    }

    // Fetches responses for an order using order id
    goAndFetchData = () => {
        fetch('order/' + this.props.info.id + '/responses')
            .then(function (response) {
                return response.json();
            })
            .then((function (jsonobject) {
                this.setState({responses: jsonobject});
            }).bind(this));

    };
    // Fetches requirement for an order using order id
    getRequirements = () => {
        fetch('order/' + this.props.info.id + '/requirements')
            .then(function (requirement) {
                return requirement.json();
            })
            .then((function (jsonobject) {
                this.setState({requirements: jsonobject});
            }).bind(this));

    };

    // shows the response form when user presses the button "Lähetä"
    handleClick() {
        this.setState({
            isFormVisible: true
        });
    };

    handleSendForm = (e) => {
        e.preventDefault();
        this.addResponse(e);

    };

    // adds users response to the database
    addResponse() {
        const responseItem = {
            content: this.state.content,
            responder: this.props.user
        };
        fetch('order/' + this.props.info.id + '/responses',
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(responseItem)
            }).then((function (response) {
            this.goAndFetchData();
        }).bind(this));

        // Hides the form after sending
        this.setState({isFormVisible: false})
    };

    // Timestamp formating
    changeTime = (e) => {
        var a = new Date(e);
        var months = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        time = date + '.' + month + '.' + year + ' ' + hour + ':' + min + ':' + sec;
        return time;
    };

    render() {
        let form = null;
        // Searching for the requirement text
        var requirements = this.state.requirements.map(function (requirement) {
            return (
                <div key={requirement.id}>
                    {requirement.requirement}
                </div>
            )
        }, this);

        // Searching for timestamp, content and writer for a response.
        // A button to accept the response appears when the order is made by the user who is logged in.
        var responses = this.state.responses.map(function (response) {
            return (
                <div key={response.id}>
                    <Row className="order-response" key={response.id}>
                        <Col sm={9} smOffset={2}>
                            {response.content}
                        </Col>
                    </Row>
                    <Row className="order-response-author">
                        <Col sm={5} smOffset={2}>
                            <p>Tarjoaja: <Link to={'/user/' + response.responder.id}>{response.responder.name}</Link>
                            </p>
                        </Col>
                        <Col sm={4}>
                            {this.changeTime(response.createDate)}
                        </Col>
                    </Row>
                    <Row className="order-response-accept">
                        <Col sm={9} smOffset={2}>
                            {this.props.user.id === this.props.info.user.id ?
                                <AcceptResponse responder={response.responder}/> : null}
                        </Col>
                    </Row>
                    <Row><Col><hr className="order-response-hr"/></Col></Row>
                </div>
            )
        }, this);

        //If the user has pressed the button "Vastaa ilmoitukseen", isFormVisible is true and the response form is visible
        if (this.state.isFormVisible) {
            form =
                <form>
                    <textarea type="text"
                              placeholder="Teksti"
                              value={this.state.content}
                              onChange={e => this.setState({content: e.target.value})}
                              cols="50"
                              rows="10"/>
                    <br/>

                    <input type="submit"
                           value="Lähetä"
                           onClick={e => this.handleSendForm(e)}/>
                    <button onClick={() => this.setState({isFormVisible: false})}>Sulje</button>
                </form>;
        }
        let responseButton = null;
        // Checks if the user has logged in. If yes, shows the button so that the user can send a message.
        // If the user hasn't logged in, the button is not visible.
        if (this.props.auth === true && this.props.user.userStatus === "chef") {
            responseButton = <button onClick={this.handleClick}>Vastaa tilaukseen</button>
        }
        return (
            //Shows information about the order (including requirements and responses).
            <Row className="order-row">
                <Col xs={12}>
                    <Row className="order-header">
                        <Col sm={10} smOffset={1}>
                            <h4>{this.props.info.title}</h4>
                        </Col>
                    </Row>
                    <Row className="order-content">
                        <Col sm={10} smOffset={1}>
                            {this.props.info.content}
                            <p>Erityisvaatimukset: {requirements}</p>
                        </Col>
                    </Row>
                    <Row className="order-author">
                        <Col sm={6} smOffset={1}>
                            Tilaaja: <Link to={'/user/' + this.props.info.user.id}>{this.props.info.user.name}</Link>
                        </Col>
                        <Col sm={4}>
                            {this.changeTime(this.props.info.createDate)}
                        </Col>
                    </Row>
                    <Row className="order-responses-header">
                        <Col sm={10} smOffset={1}>
                            {(this.state.responses.length > 0) && <h5>Vastaukset ({(this.state.responses.length)}) :</h5>}
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12}>
                            {responses}
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={4} smOffset={7}>
                            {responseButton}
                        </Col>
                    </Row>
                    <br/>
                    <div>
                        {form}
                    </div>
                </Col>
            </Row>
        );
    }
}

export default Orders;