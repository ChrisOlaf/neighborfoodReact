import React, {Component} from 'react';

// Login-component lets you input username(email) and password.
// Sends data to REST where data is retrieved from database and username and password are verified
class Login extends Component {
    //state containing empty user-information.
    state = {
        id: '', name: '', lastName: '', phoneNumber: '',
        location: '', presentation: '', userStatus: '',
        email: '', password: ''
    };

    //method is called in the login form. checks if user
    // exists in the database and sets it to state.
    verify = e => {
        e.preventDefault();
        console.log("verify..");
        var x = this;
        fetch('verify',
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
                    return res.json();
                }
                else {
                    throw new Error("something wrong with the response");
                }
            })
            .then(function (json) {
                x.setState(json);
                x.send();
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
        return (
            <div>
                <form>
                    sähköposti:
                    <input type="text"
                           name="email"
                           placeholder="moi@koi"
                           onChange={e => this.change(e)}
                           value={this.state.email}/>
                    <br/>
                    salasana:
                    <input type="password"
                           name="password"
                           placeholder="*******"
                           value={this.state.password}
                           onChange={e => this.change(e)}/>
                    <br/>
                    <input type="submit"
                           value="Kirjaudu sisään"
                           onClick={this.verify}/>
                </form>
                <p>
                    Nimi: {this.state.name}<br/>
                    maili: {this.state.email}<br/>
                    salasana {this.state.password}<br/>
                </p>
            </div>
        )

    }
};

export default Login;
