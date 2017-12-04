import React, { Component } from 'react';


class Login extends Component{

    state= {}


    render(){
        return(
                <div>
                    <input type="text" placeholder="" value={this.state.name}/>

            </div>
        )

    }};

export default Login;
