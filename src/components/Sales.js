import React, {Component} from 'react';

class Sales extends Component {
    render () {
        return(
            <div>
                <p>Ilmoitus jätetty: {this.props.info.createDate}</p>
                <p>Ilmoituksen sisältö: {this.props.info.content}</p>
                <p>Käyttäjä: {this.props.info.seller.name}</p>
                <br/>
            </div>
        );
    }
}
export default Sales;