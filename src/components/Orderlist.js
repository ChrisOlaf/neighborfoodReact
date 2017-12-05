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
                console.dir(jsonobject)
                this.setState({data: jsonobject});
            }).bind(this));
    }

    render() {
        var orders = this.state.data.map(function (order) {
            return (<Orders info={order} key={order.id}/>);
        });
        return (
            <div className="OrderList">
                {orders}
            </div>
        );
    }
}
export default Orderlist;