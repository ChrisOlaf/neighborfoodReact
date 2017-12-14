import React, {Component} from 'react';
import Chef from './Chef';

var cachedUser;
class Chefs extends Component {

    state = {chefs: [], user: {id:'', location:''}};

    getChefs() {
        fetch('allchefs')
            .then(function (response) {
                return response.json();
            })
            .then((function (jsonobject) {
                this.setState({chefs: jsonobject});
            }).bind(this));
    }

    componentDidMount = () => {
        cachedUser = window.sessionStorage.getItem('storedUser');
        const x = this;
        if (cachedUser) {
            var user = JSON.parse(cachedUser);
            x.setState({user:user});
            console.log("Haki käyttäjän storagesta!");
        }
        else {
            console.log("Käyttäjää ei löytynyt storagesta..?");
        }
        this.getChefs();
    };

    // render() {
    //     var orders = this.state.data.map(function (order) {
    //         return (<Orders info={order} key={order.id} auth={this.props.auth} user={this.props.user}/>);
    //     }, this);
    //     return (
    //         <div className="OrderList">
    //             {orders}
    //         </div>
    //     );
    // }
    render() {
         var chefs = this.state.chefs.map(function (user) {
             return (<Chef kokki={user} key={user.id} user={this.state.user}/>);}
         ,this);

         return(
        <div className="register-content">
            <h1>Kokit lähellä sinua (alue: {this.state.user.location})</h1>
                <div>{chefs}</div>

        </div>
    )
    }
}

export default Chefs;