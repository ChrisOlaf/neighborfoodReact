import React, {Component} from 'react';

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
        // var chefs = this.state.chefs.map(function (chef) {
        //     return (<Chef )
        // })
    return(
        <div>
            <h1>{this.state.user.location}</h1>
            <h1>{this.state.chefs}</h1>
        </div>
    )
    }
}