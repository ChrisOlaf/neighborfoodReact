import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Row, Col} from 'react-bootstrap';

import '../App.css';
import AcceptResponse from "./AcceptResponse";

var time = undefined;

class Sales extends Component {

    constructor(props) {
        super(props);
        this.state = {
            content: '',
            order_id: '',
            isFormVisible: false,
            responses: [],
            requirements: [],
            userID: ''
        };
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.goAndFetchData();
        this.getRequirements();
    }

    goAndFetchData = () => {
        fetch('sale/' + this.props.info.id + '/responses')
            .then(function (response) {
                return response.json();
            })
            .then((function (jsonobject) {
                this.setState({responses: jsonobject});
            }).bind(this));

    };

    getRequirements = () => {
        fetch('sale/' + this.props.info.id + '/requirements')
            .then(function (requirement) {
                return requirement.json();
            })
            .then((function (jsonobject) {
                this.setState({requirements: jsonobject});
            }).bind(this));

    };

    handleClick() {
        this.setState({
            isFormVisible: true
        });
    };

    handleSendForm = (e) => {
        e.preventDefault();
        this.addResponse(e);
    };

    addResponse() {
        const responseItem = {
            content: this.state.content,
            responder: this.props.user
        }
        fetch('sale/' + this.props.info.id + '/responses',
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


        this.setState({isFormVisible: false})
    };

    changeTime = (e) => {
        var a = new Date(e);
        var months = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours()< 10 ? '0'+a.getHours():a.getHours();
        var min = a.getMinutes()< 10 ? '0'+a.getMinutes():a.getMinutes();
        var sec = a.getSeconds()< 10 ? '0'+a.getSeconds(): a.getSeconds();
        time = date + '.' + month + '.' + year + ' ' + hour + ':' + min + ':' + sec;
        return time;
    };

    render() {
        let form = null;
        var requirements = this.state.requirements.map(function (requirement) {
            return (
                <p key={requirement.id}>
                    {requirement.requirement}
                </p>
            )
        }, this);
        var responses = this.state.responses.map(function (response) {
            return (
                <div key={response.id}>
                    <Row className="sale-response" key={response.id}>
                        <Col xs={9} xsOffset={2}>
                            {response.content}
                        </Col>
                    </Row>
                    <Row className="sale-response-author">
                        <Col xs={5} xsOffset={2}>
                            <p>Tilaaja: <Link to={'/user/' + response.responder.id}>{response.responder.name}</Link>
                            </p>
                        </Col>
                        <Col xs={4}>
                            {this.changeTime(response.createDate)}
                        </Col>
                    </Row>
                    <Row className="order-response-accept">
                        <Col xs={9} xsOffset={2}>
                            {this.props.user.id === this.props.info.user.id ?
                                <AcceptResponse responder={response.responder}/> : null}
                        </Col>
                    </Row>
                    <Row><Col>
                        <hr className="order-response-hr"/>
                    </Col></Row>
                </div>
            )
        }, this);

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
        if (this.props.auth === true) {
            responseButton = <button onClick={this.handleClick}>Vastaa</button>
        }
        return (
            <Row className="sale-row">
                <Col xs={12}>
                    <Row className="sale-header">
                        <Col xs={10} xsOffset={1}>
                            <h4>{this.props.info.title}</h4>
                        </Col>
                    </Row>
                    <Row className="sale-content">
                        <Col xs={10} xsOffset={1}>
                            {this.props.info.content}
                            <p>Erityisruokavaliot:</p> {requirements}
                        </Col>
                    </Row>
                    <Row className="sale-author">
                        <Col xs={10} xsOffset={1} md={6} mdOffset={1}>
                            Kokki: <Link to={'/user/' + this.props.info.user.id}>{this.props.info.user.name}</Link>
                        </Col>
                        <Col xs={10} xsOffset={1} md={4} mdOffset={0}>
                            {this.changeTime(this.props.info.createDate)}
                        </Col>
                    </Row>
                    <Row className="sale-responses-header">
                        <Col xs={10} xsOffset={1}>
                            {(this.state.responses.length > 0) &&
                            <h5>Vastaukset ({(this.state.responses.length)}) :</h5>}
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            {responses}
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={4} xsOffset={7}>
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

export default Sales;