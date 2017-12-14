import React, {Component} from 'react';

class Profile extends Component {

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
                            <td>{this.props.user.name}</td>
                        </tr>
                        <tr>
                            <td>Sijainti:</td>
                            <td>{this.props.user.location}</td>
                        </tr>
                        <tr>
                            <td>Kuvaus:</td>
                            <td>{this.props.user.presentation}</td>
                        </tr>
                        <tr>
                            <td>Status:</td>
                            <td>{this.props.user.userStatus}</td>
                        </tr>
                        <tr>
                            <td>Ota yhteyttä:</td>
                            <td>{this.props.user.email}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            )

    }
};

export default Profile;
