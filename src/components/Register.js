import React, { Component } from 'react';
import Login from './Login';
import Profile from './Profile';

class Register extends Component {
    state = {name:'', lastName:'', phoneNumber:'',
        location:'',presentation:'',userStatus:'',
        email:'',password:''};

    change = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        });
    };
    handleChange = (e) =>{
        this.setState({
            location: e.target.value});
    };
    handleStatus = (e) =>{
        this.setState({
            userStatus: e.target.value});
    };

    handleClick = (e) =>{
        e.preventDefault();
        this.addUser(e);

    };

    addUser = (e) => {
        fetch('adduser',
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(this.state)
            })
            .then(function(res){ console.log(res) })
            .catch(function(res){ console.log(res) })

        this.setState({name:'', lastName:'',
            phoneNumber:'', location:'',presentation:'',
            userStatus:'',email:'',password:''})
    };


    render(){
        return (
            <div>
            <form>
                etunimi: <input name="name"
                       type="text"
                       placeholder="Pulla"
                       id="name"
                       value={this.state.name}
                       onChange={e => this.change(e)}/>
                <br />
                sukunimi: <input name="lastName"
                       type="text"
                       placeholder="Pepe"
                       id="lastName"
                       value={this.state.lastName}
                       onChange={e => this.change(e)}/>
                <br />
                puhelinnumero: <input name="phoneNumber"
                       type="number"
                       placeholder="0101112222"
                       id="phoneNumber"
                       value={this.state.phoneNumber}
                       onChange={e => this.change(e)}/>
                <br />
                Valitse sijainti:
                <br />
                <select name="location" onChange={e => this.handleChange(e)}>
                    <option value="etelä">Etelä</option>
                    <option value="pohjoinen">Pohjoinen</option>
                    <option value="lansi">Länsi</option>
                    <option value="ita">Itä</option>
                </select>
                <br />
                Oma esittely: <input name="presentation"
                       type="textarea"
                       rows="300px"
                       cols="400px"
                       placeholder="kerro itsestäsi"
                       id="presentation"
                       value={this.state.presentation}
                       onChange={e => this.change(e)}/>
                <br />
                Oletko?
                <br />
                <input name="userStatus"
                       type="radio"
                       id="userStatus"
                       value="dude"
                       onChange={e => this.handleStatus(e)}/>tyyppi
                <br/>
                <input name="userStatus"
                       type="radio"
                       id="userStatus"
                       value="chef"
                       onChange={e => this.handleStatus(e)}/>vai kokki?
                <br />
                sähköposti: <input name="email"
                       type="email"
                       placeholder="mokki@kokki"
                       id="email"
                       value={this.state.email}
                       onChange={e => this.change(e)}/>
                <br />
                salasana: <input name="password"
                       type="password"
                       placeholder="********"
                       id="password"
                       value={this.state.password}
                       onChange={e => this.change(e)}/>
                <br />
                <input type="submit"
                       value="lähetä"
                       onClick={e=> this.handleClick(e)}/>
                <br />
                <input type="reset" value="tyhjennä"/>
            </form>
                <br />
                <Login/>
                <br />
                <Profile/>
            </div>
        );
    }
}
export default Register;