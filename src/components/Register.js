import React, { Component } from 'react';

class Register extends Component {
    state = {name:'', lastName:'', phoneNumber:'', location:'',presentation:'',userStatus:''};

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

        this.setState({name:'', lastName:'', phoneNumber:'', location:'',presentation:'',userStatus:''})
    };


    render(){
        return (
            <form>
                <input name="name"
                       type="text"
                       placeholder="etunimi"
                       id="name"
                       value={this.state.name}
                       onChange={e => this.change(e)}/>
                <br />
                <input name="lastName"
                       type="text"
                       placeholder="sukunimi"
                       id="lastName"
                       value={this.state.lastName}
                       onChange={e => this.change(e)}/>
                <br />
                <input name="phoneNumber"
                       type="number"
                       placeholder="puhelinnumero"
                       id="phoneNumber"
                       value={this.state.phoneNumber}
                       onChange={e => this.change(e)}/>
                <br />
                Valitse sijainti
                <br />
                <select name="location" onChange={e => this.handleChange(e)}>
                    <option value="etelä">Etelä</option>
                    <option value="pohjoinen">Pohjoinen</option>
                    <option value="lansi">Länsi</option>
                    <option value="ita">Itä</option>
                </select>
                <br />
                <input name="presentation"
                       type="textarea"
                       rows="300px"
                       cols="400px"
                       placeholder="Oma esittely"
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

                <input type="submit"
                       value="lähetä"
                       onClick={e=> this.handleClick(e)}/>
                <input type="reset" value="tyhjennä"/>
            </form>
        );
    }
}
export default Register;