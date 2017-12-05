import React, {Component} from 'react';
import Sales from "./Sales";

class Saleslist extends Component {

    state = {data: []}
    componentDidMount() {
        fetch('allsales')
            .then(function (response) {
                return response.json();
            })
            .then((function (jsonobject) {
                console.dir(jsonobject)
                this.setState({data: jsonobject});
            }).bind(this));
    }

    render() {
        var sales = this.state.data.map(function (sale) {
            return (<Sales info={sale} key={sale.id}/>);
        });
        return (
            <div className="SalesList">
                {sales}
            </div>
        );
    }
}
export default Saleslist;