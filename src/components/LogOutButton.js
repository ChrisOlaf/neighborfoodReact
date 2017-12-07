import React, { Component } from 'react';

class LogOutButton extends Component {

    logout = () => {
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