import React, { Component } from 'react';


class Login extends Component{

    state = {id:'',name:'', lastName:'', phoneNumber:'',
        location:'',presentation:'',userStatus:'',
        email:'',password:''};

    verify = e => {
        e.preventDefault();
        console.log("verify..");
        var joku = this;
        fetch('verify',
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(this.state)
            })
            .then(function(res){
                if(res.ok){
                    console.dir("moimoi");
                    return res.json();
                }
                else{
                    throw new Error("something wrong with the response");
                }
            })
            .then(function(json){
                console.dir("moi");
                joku.setState(json);
                joku.send();

     });
    };
    send = () =>{
        this.props.callback(this.state);
    };

    change = (e) => {
        this.setState({
            [e.target.name]: e.target.value});
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
                    <p>
                       Nimi: {this.state.name}<br />
                       maili: {this.state.email}<br />
                       salasana {this.state.password}<br />
                    </p>
                </div>
        )

    }};

export default Login;
