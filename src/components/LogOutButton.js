import React, { Component } from 'react';

class LogOutButton extends Component {
    state = {id:'',name:'', lastName:'', phoneNumber:'',
        location:'',presentation:'',userStatus:'',
        email:'',password:''};

    logout = () => {
        this.setState({user: [], auth: false});
        window.sessionStorage.clear();
        this.props.callback(this.state);
        console.log("Logout-napin check:")
        console.log(localStorage);
    }

    render() {
        return (
            <div>
                <span onClick={this.logout}>Kirjaudu ulos</span>
            </div>
        )
    }
}

export default LogOutButton;