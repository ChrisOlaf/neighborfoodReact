import React, {Component} from 'react';


class User extends Component {
    state = {id:this.props.id, auth: this.props.auth};
    render() {

        const id = this.props.location.state;
        console.log(id);
        console.log("näytä state:.")
        console.dir(
            this.props.state
        );

        console.dir(
            this.props.id
        )
        return (
            <span>
                <h1>Tässä pitäisi näkyä state:</h1>
                <h1>{this.state.id}</h1>
                <h1>{this.state.auth}</h1>
                <h1>{this.props.match.params.id}</h1>
            </span>
        );
    }
}

export default User;
