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
                    <table></table>
                </div>
        )

}};

export default Profile;
