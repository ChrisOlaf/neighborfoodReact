import React, { Component } from 'react';


class Login extends Component{

    state= {login: {email:'', password:''}};

    change = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };
    verify = e => {

    };

    render(){
        return(
                <div>
                    <form>
                        sähköposti:
                        <input type="text"
                               name="email"
                               placeholder="moi@koi"
                               onChange={e => this.change(e)}
                               value={this.state.email}/>
                    <br />
                        salasana:
                        <input type="text"
                               name="password"
                               placeholder="*******"
                               value={this.state.password}
                               onChange={e => this.change(e)}/>
                        <br />
                        <input type="submit"
                               value="Kirjaudu sisään"
                               onClick={this.verify}/>
                    </form>
                </div>
        )

    }};

export default Login;
