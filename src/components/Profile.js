import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Profile extends Component {
    state = {id:this.props.user.id, presentation:this.props.user.presentation};


    componentDidMount = () =>{
        var i = this.props.user.id
    fetch('/getuser/'+i)
        .then(function (requirement) {
            return requirement.json();
        })
        .then((function (jsonobject) {
        this.setState({id:this.props.user.id, presentation:jsonobject.presentation});
        }).bind(this));

    };
    changePres = (e) => {
        e.preventDefault();

        fetch('userpresentation',
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "PUT",
                body: JSON.stringify(this.state)
            })
            .then(function (res) {
                console.log("thenissä ollaan")
                console.log(res);
            })
            .catch(function (res) {
                console.log(res)
            })

    };
    changePresState = (e) => {
        this.setState({id:this.props.user.id, presentation:e.target.value})
    };
    render() {
        if (this.props.user === null || this.props.user === undefined) {
            return (
                <h1>Sinun pitää kirjautua sisään, että näet profiilisivun</h1>
            )
        }
        else
            return (
                <div className="register-content">
                    <table>
                        <tbody>
                        <tr>
                            <td>Nimi:</td>
                            <td><Link to={'/user/' + this.props.user.id}>{this.props.user.name}</Link></td>
                        </tr>
                        <tr>
                            <td>Sijainti:</td>
                            <td>{this.props.user.location}</td>
                        </tr>
                        <tr>
                            <td>Kuvaus:</td>
                            <td>
                                {this.state.presentation}
                            </td>
                        </tr>
                        <tr>
                            <td>Status:</td>
                            <td>{this.props.user.userStatus}</td>
                        </tr>
                        <tr>
                            <td>email:</td>
                            <td>{this.props.user.email}</td>
                        </tr>
                       <tr>
                           <td>
                               Muuta kuvausta
                           </td>
                           <td>
                               <form>
                                   <input type="text" value={this.props.user.presentation.value} onChange={e => this.changePresState(e)}/><input type="submit" onClick={e => this.changePres(e)} value="Tallenna muutokset"/>
                               </form>
                           </td>

                       </tr>
                        </tbody>
                    </table>
                </div>
            )

    }
};

export default Profile;
