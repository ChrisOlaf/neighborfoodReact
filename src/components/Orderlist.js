import React, {Component} from 'react';
import Orders from "./Orders";

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
        console.log("Auth: " +this.props.auth)
        console.log("User: " + this.props.user)
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