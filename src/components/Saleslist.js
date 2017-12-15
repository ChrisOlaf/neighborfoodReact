import React, {Component} from 'react';
import Sales from "./Sales";

// Fetches all sales from database. Component Sales fetches more detailed information about every sale.
class Saleslist extends Component {

    state = {data: []};
    componentDidMount() {
        fetch('allsales')
            .then(function (response) {
                return response.json();
            })
            .then((function (jsonobject) {
                this.setState({data: jsonobject});
            }).bind(this));
    }

    render() {
        var sales = this.state.data.map(function (sale) {
            return (<Sales info={sale} key={sale.id} auth={this.props.auth} user={this.props.user}/>);
        }, this);
        return (
            <div className="SalesList">
                {sales}
            </div>
        );
    }
}
export default Saleslist;