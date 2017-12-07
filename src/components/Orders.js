import React, {Component} from 'react';
import AddOrder from "./AddOrder";
import Responseform from './Responseform';


class Orders extends Component {

    state = {
        isFormVisible: false,
    }

    render () {
        return(
            <div>
                <p>Ilmoitus jätetty: {this.props.info.createDate}</p>
                <p>Ilmoituksen tiedot: {this.props.info.content}</p>
                <p>Käyttäjä: {this.props.info.user.name}</p>
                <button onClick={() => this.setState({ isFormVisible: true })}>Vastaa tilaukseen</button>
                <br/>
                <div>
                    { this.state.isFormVisible ? <Responseform order_id={this.props.info.id} /> : null }
                    { this.state.isFormVisible ? <button onClick={() => this.setState({ isFormVisible: false })}>Sulje</button> : null}
                </div>
                <AddOrder/>
            </div>
        );
    }
}
export default Orders;