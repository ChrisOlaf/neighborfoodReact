import React, {Component} from 'react';
import AddOrder from "./AddOrder";

class Orders extends Component {
    render () {
        return(
            <div>
                <p>Ilmoitus jätetty: {this.props.info.createDate}</p>
                <p>Ilmoituksen tiedot: {this.props.info.content}</p>
                {/*<p>Käyttäjä: {this.props.info.user.name}</p>*/}
                <br/>
                <AddOrder/>
            </div>
        );
    }
}
export default Orders;