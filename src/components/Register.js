import React, {Component} from 'react';
import {Row, Col, Form, FormGroup, FormControl, ControlLabel, Radio, Button} from 'react-bootstrap';
import { Redirect } from 'react-router';
import '../App.css';

const PwReminder = () => {
    return (
        <div>
            <span>Salasanassa tulee täyttyä seuraavat ehdot:</span>
            <ul>
                <li>Yhteensä 8-15 merkkiä.</li>
                <li>Yksi iso kirjain.</li>
                <li>Yksi pieni kirjain.</li>
                <li>Yksi numero.</li>
            </ul>
        </div>)
};


// Component that handles registering new users for the site.
class Register extends Component {

    // Initializing users state
    state = {
        name: '',
        lastName: '',
        phoneNumber: '',
        location: 'Etelä',
        presentation: '',
        userStatus: '',
        email: '',
        password: '',
        invalidEmail: false,
        falseEmail: false,
        invalidName: false,
        nameLength: false,
        numberLength: false,
        invalidPword: false
    };
    change = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };
    handleChange = (e) => {
        this.setState({
            location: e.target.value
        });
    };
    handleStatus = (e) => {
        this.setState({
            userStatus: e.target.value
        });
    };
    handleClick = (e) => {
        e.preventDefault();
        this.addUser(e);

    };
    // Function that is being called when new user has filled in the form and tries to send data to backend.
    addUser = (e) => {
        this.setState(
            {
                invalidEmail: false,
                falseEmail: false,
                invalidName: false,
                nameLength: false,
                numberLength: false,
                invalidPword: false
            });
        const t = this;
        fetch('adduser',
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(this.state)
            })
            .then(function (res) {
                if (res.ok) {
                    console.log(res);
                    return res.json();
                } else {
                    throw new Error('Serveri ei vastannut kutsuun!');
                }
            })
            .then(function (json) {
                const x = ({user: json});
                console.log(json);
                if (x.user.email === null && x.user.name === null) {
                    t.setState({invalidEmail: true});
                }
                if (x.user.email === 'virhe' && x.user.name === null) {
                    t.setState({falseEmail: true});
                }
                if (x.user.name === 'virhe' && x.user.email === null) {
                    t.setState({invalidName: true});
                }
                if (x.user.name === 'ssana' && x.user.email === null) {
                    t.setState({invalidPword: true});
                }
                if (x.user.name === 'lyhyt' && x.user.email === null) {
                    t.setState({nameLength: true});
                }
                if (x.user.name === 'numero' && x.user.email === null) {
                    t.setState({numberLength: true});
                }
            })
            .catch(function (res) {
                console.log(res)
            })
        if (this.state.invalidEmail === false
            && this.state.falseEmail === false
            && this.state.invalidName === false
            && this.state.nameLength === false
            && this.state.numberLength === false
            && this.state.invalidPword === false) {
            this.setState({
                name: '', lastName: '',
                phoneNumber: '', location: 'Etelä', presentation: '',
                userStatus: '', email: '', password: ''
            })
        }
    };

    onKeyPress(k) {
        const keyCode = k.keyCode || k.which;
        const keyValue = String.fromCharCode(keyCode);
        if (/\+|-|\.|e/.test(keyValue))
            k.preventDefault();
    };

    render() {
        return (
            <Row className="register-content">
                <Col xs={10} xsOffset={1}>
                    <Form horizontal>
                        <FormGroup controlId="formHorizontalName">
                            <Col componentClass={ControlLabel} sm={4}>
                                Etunimi
                            </Col>
                            <Col sm={7}>
                                <FormControl name="name"
                                             type="text"
                                             placeholder="Etunimi"
                                             id="name"
                                             required="required"
                                             value={this.state.name}
                                             onChange={e => this.change(e)}/>
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="formHorizontalLastname">
                            <Col componentClass={ControlLabel} sm={4}>
                                Sukunimi
                            </Col>
                            <Col sm={7}>
                                <FormControl name="lastName"
                                             type="text"
                                             placeholder="Sukunimi"
                                             id="lastName"
                                             required="required"
                                             value={this.state.lastName}
                                             onChange={e => this.change(e)}/>
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="formHorizontalPhonenumber">
                            <Col componentClass={ControlLabel} sm={4}>
                                Puhelinnumero
                            </Col>
                            <Col sm={7}>
                                <FormControl name="phoneNumber"
                                             type="number"
                                             placeholder="0400440440"
                                             id="phoneNumber"
                                             required="required"
                                             value={this.state.phoneNumber}
                                             onKeyPress={this.onKeyPress.bind(this)}
                                             onChange={e => this.change(e)}/>
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="formHorizontalEmail">
                            <Col componentClass={ControlLabel} sm={4}>
                                Sähköposti
                            </Col>
                            <Col sm={7}>
                                <FormControl name="email"
                                             type="email"
                                             placeholder="dough@neighborfood.com"
                                             id="email"
                                             required="required"
                                             value={this.state.email}
                                             onChange={e => this.change(e)}/>
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="formControlsTextarea">
                            <Col componentClass={ControlLabel} sm={4}>
                                Oma esittely
                            </Col>
                            <Col sm={7}>
                                <FormControl componentClass="textarea"
                                             name="presentation"
                                             type="textarea"
                                             rows="300px"
                                             cols="400px"
                                             placeholder="Kerro itsestäsi."
                                             id="presentation"
                                             value={this.state.presentation}
                                             onChange={e => this.change(e)}/>
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="formControlsLocation">
                            <Col componentClass={ControlLabel} sm={4}>
                                Sijainti
                            </Col>
                            <Col sm={7}>
                                <FormControl componentClass="select" placeholder="select" value={this.state.location}
                                             name="location" onChange={e => this.handleChange(e)}>
                                    <option value="Etelä">Etelä</option>
                                    <option value="Pohjoinen">Pohjoinen</option>
                                    <option value="Lansi">Länsi</option>
                                    <option value="Ita">Itä</option>
                                </FormControl>
                            </Col>
                        </FormGroup>

                        <ControlLabel>Oletko ruokailija vai kokki?</ControlLabel>
                        <FormGroup controlId="forControlStatus">
                            <Radio name="userStatus"
                                   inline
                                   type="radio"
                                   id="userStatus"
                                   required="required"
                                   value="dude"
                                   onChange={e => this.handleStatus(e)}>Ruokailija</Radio>
                            {' '}
                            <Radio name="userStatus"
                                   inline
                                   type="radio"
                                   id="userStatus"
                                   required="required"
                                   value="chef"
                                   onChange={e => this.handleStatus(e)}>Kokki</Radio>
                        </FormGroup>

                        <FormGroup controlId="formHorizontalPassword">
                            <Col componentClass={ControlLabel} sm={4}>
                                Salasana
                            </Col>
                            <Col sm={7}>
                                <FormControl name="password"
                                             type="password"
                                             placeholder="********"
                                             id="password"
                                             required="required"
                                             value={this.state.password}
                                             onChange={e => this.change(e)}/>
                            </Col>
                        </FormGroup>

                        <FormGroup>
                            <Col componentClass={ControlLabel} sm={11}>
                                <Button type="submit" onClick={e => this.handleClick(e)}>
                                    Lähetä
                                </Button>
                            </Col>
                        </FormGroup>

                    </Form>
                    <div className="errorMsg">
                        {this.state.invalidEmail === true && "Antamallasi sähköpostilla on jo käyttäjätunnus."}
                        {this.state.falseEmail === true && "Tarkista antamasi sähköpostiosoite."}
                        {this.state.invalidName === true && "Tarkista, että olet kirjoittanut nimesi oikein."}
                        {this.state.nameLength === true && "Tarkista, että olet kirjoittanut nimesi oikein."}
                        {this.state.numberLength === true && "Tarkista, että olet kirjoittanut puhelinnumerosi oikein. Se on tärkeää yhteydenpitoa varten."}
                        {this.state.invalidPword === true && <PwReminder/>}
                    </div>
                </Col>
            </Row>
            // <div>
            //     <form autoComplete="on">
            //         etunimi: <input name="name"
            //                         type="text"
            //                         placeholder="Etunimi"
            //                         id="name"
            //                         required="required"
            //                         value={this.state.name}
            //                         onChange={e => this.change(e)}
            //     />
            //         <br/>
            //         sukunimi: <input name="lastName"
            //                          type="text"
            //                          placeholder="Sukunimi"
            //                          id="lastName"
            //                          required="required"
            //                          value={this.state.lastName}
            //                          onChange={e => this.change(e)}
            //     />
            //         <br/>
            //         puhelinnumero: <input name="phoneNumber"
            //                               type="number"
            //                               placeholder="0400440440"
            //                               id="phoneNumber"
            //                               required="required"
            //                               value={this.state.phoneNumber}
            //                               onKeyPress={this.onKeyPress.bind(this)}
            //                               onChange={e => this.change(e)}
            //     />
            //         <br/>
            //         Valitse sijainti:
            //         <br/>
            //         <select value={this.state.location} name="location" onChange={e => this.handleChange(e)}>
            //             <option value="Etelä">Etelä</option>
            //             <option value="Pohjoinen">Pohjoinen</option>
            //             <option value="Lansi">Länsi</option>
            //             <option value="Ita">Itä</option>
            //         </select>
            //         <br/>
            //         Oma esittely: <input name="presentation"
            //                              type="textarea"
            //                              rows="300px"
            //                              cols="400px"
            //                              placeholder="Kerro itsestäsi."
            //                              id="presentation"
            //                              value={this.state.presentation}
            //                              onChange={e => this.change(e)}/>
            //         <br/>
            //         Oletko ruokailija vai kokki?
            //         <br/>
            //         <input name="userStatus"
            //                type="radio"
            //                id="userStatus"
            //                required="required"
            //                value="dude"
            //                onChange={e => this.handleStatus(e)}
            //         />Ruokailija
            //         <br/>
            //         <input name="userStatus"
            //                type="radio"
            //                id="userStatus"
            //                required="required"
            //                value="chef"
            //                onChange={e => this.handleStatus(e)}
            //         />Kokki
            //         <br/>
            //         sähköposti: <input name="email"
            //                            type="email"
            //                            placeholder="dough@neighborfood.com"
            //                            id="email"
            //                            required="required"
            //                            value={this.state.email}
            //                            onChange={e => this.change(e)}
            //     />
            //         <br/>
            //         salasana: <input name="password"
            //                          type="password"
            //                          placeholder="********"
            //                          id="password"
            //                          required="required"
            //                          value={this.state.password}
            //                          onChange={e => this.change(e)}
            //     />
            //         <br/>
            //         <input type="submit"
            //                value="lähetä"
            //                onClick={e => this.handleClick(e)}/>
            //         <br/>
            //         <input type="reset" value="tyhjennä"/>
            //     </form>
            //     <div className="errorMsg">
            //         {this.state.invalidEmail === true && "Antamallasi sähköpostilla on jo käyttäjätunnus."}
            //         {this.state.falseEmail === true && "Tarkista antamasi sähköpostiosoite."}
            //         {this.state.invalidName === true && "Tarkista, että olet kirjoittanut nimesi oikein."}
            //         {this.state.nameLength === true && "Tarkista, että olet kirjoittanut nimesi oikein."}
            //         {this.state.numberLength === true && "Tarkista, että olet kirjoittanut puhelinnumerosi oikein. Se on tärkeää yhteydenpitoa varten."}
            //         {this.state.invalidPword === true && <PwReminder/>}
            //     </div>
            // </div>
        );
    }
}

export default Register;