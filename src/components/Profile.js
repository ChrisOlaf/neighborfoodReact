import React, { Component } from 'react';
class Profile extends Component{

    state= {user:[]};
    getUser = () =>{
        var joku = this;
        var param = '?i=1';

        fetch('getuser'+param)
        .then(function(res){
            if(res.ok){
                console.dir("jeejee");
                return res.json();
            }else{
                throw new Error("something wrong with the response");
            }
        })
        .then(function(json){
            console.dir("moi");
            joku.setState({user: json});
            console.log(joku.state);
        });
    };

    render(){
        return(
                <div>
                    <button onClick={this.getUser}>Klikkaa</button>
                    <table>
                        <tr><td>Nimi: </td><td>{this.props.user.name}</td></tr>
                        <tr><td>Sijainti: </td><td>{this.props.user.location}</td></tr>
                        <tr><td>Kuvaus: </td><td>{this.props.user.presentation}</td></tr>
                        <tr><td>Status: </td><td>{this.props.user.userStatus}</td></tr>
                        <tr><td>Ota yhteyttä: </td><td>{this.props.user.email}</td></tr>
                    </table>
                </div>
        )

}};

export default Profile;
