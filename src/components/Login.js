import React, {Component} from 'react';
import {Row, Col, FormControl, FormGroup, Form, ControlLabel, Button} from 'react-bootstrap';
import { Redirect } from 'react-router';
import '../App.css';

// Login-component lets you input username(email) and password.
// Sends data to REST where data is retrieved from database and username and password are verified
class Login extends Component {
    //state containing empty user-information.
    state = {
        id: '',
        name: '',
        lastName: '',
        phoneNumber: '',
        location: '',
        presentation: '',
        userStatus: '',
        email: '',
        password: '',
        redirect: false,
        authenticated: 0
    };

    //method is called in the login form. checks if user
    // exists in the database and sets it to state.
    verify = e => {
        e.preventDefault();
        console.log("verify..");
        const user = {
            id: this.state.id,
            name: this.state.name,
            lastName: this.state.lastName,
            phoneNumber: this.state.phoneNumber,
            location: this.state.location,
            presentation: this.state.presentation,
            userStatus: this.state.userStatus,
            email: this.state.email,
            password: this.state.password
        };
        var x = this;
        fetch('verify',
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(user)
            })
            .then(function (res) {
                if (res.ok) {
                    return res.json();
                }
                else {
                    throw new Error("something wrong with the response");
                }
            })
            .then(function (json) {
                console.log(json)
                if(json.id) {
                    x.setState(json);
                    x.send();
                    x.setState({redirect: true});
                    x.setState({authenticated: 1})
                } else {
                    x.setState({authenticated:2})
                }
            });
    };

    //Send this.state (which is the verified user from the method verify)
    // to App.js where it is moved to the Sessionstorage
    send = () => {
        this.props.callback(this.state);
    };

    //Changes the state of the target
    // name(email or password) to a target value
    change = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    //Returns a simple login form
    render() {
        if (this.state.authenticated===1 && this.state.redirect) {
            return <Redirect to='/home'/>;
        }
        return (
            <Row className="login-content">
                <Col className="login-content-col" xs={10} xsOffset={1}>
                    <Row className="login-form">
                        <Col xs={10} xsOffset={1}>
                            <Form horizontal>
                                <FormGroup controlId="formHorizontalEmail">
                                    <Col componentClass={ControlLabel} sm={4}>
                                        Sähköpostiosoite
                                    </Col>
                                    <Col sm={8}>
                                        <FormControl name="email"
                                                     type="email"
                                                     placeholder="buns@neighborfood.fi"
                                                     value={this.state.email}
                                                     onChange={e => this.change(e)}/>
                                    </Col>
                                </FormGroup>

                                <FormGroup controlId="formHorizontalPassword">
                                    <Col componentClass={ControlLabel} sm={4}>
                                        Salasana
                                    </Col>
                                    <Col sm={8}>
                                        <FormControl name="password"
                                                     type="password"
                                                     placeholder="********"
                                                     value={this.state.password}
                                                     onChange={e => this.change(e)}/>
                                    </Col>
                                </FormGroup>

                                <FormGroup>
                                    <Col componentClass={ControlLabel} sm={12}>
                                        <Button type="submit" onClick={this.verify}>
                                            Kirjaudu
                                        </Button>
                                    </Col>
                                </FormGroup>
                            </Form>
                            {this.state.authenticated===2 ? <p>Käyttäjätunnus tai salasana väärin, yritä uudestaan!</p> : null}
                        </Col>
                    </Row>
                </Col>
            </Row>
        )

    }
};

export default Login;
