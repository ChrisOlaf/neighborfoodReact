import React, {Component} from 'react';
import Orders from "./Orders";

// Fetches all orders from database. Component Orders fetches more detailed information about every order.
class Orderlist extends Component {

    state = {data: []}
    componentDidMount() {
        fetch('allorders')
            .then(function (response) {
                return response.json();
            })
            .then((function (jsonobject) {
                this.setState({data: jsonobject});
            }).bind(this));
    }

    render() {
        var orders = this.state.data.map(function (order) {
            return (<Orders info={order} key={order.id} auth={this.props.auth} user={this.props.user}/>);
        }, this);
        return (
            <div className="OrderList">
                {orders}
            </div>
        );
    }
}
export default Orderlist;