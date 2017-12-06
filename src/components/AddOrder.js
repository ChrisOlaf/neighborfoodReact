import React, {Component} from 'react';

class AddOrder extends Component {
    state = {orders: {content: '', requirements:[]}}

    handleInput = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        });
    };

    addRequirement = (e) => {

    }


    render () {
        return(
            <div>
            <form>
                <input type="textarea" placeholder="Tilaus" name="content" value={this.state.value} onChange={this.handleInput}/>

            </form>
                <p>{this.state.orders.content}</p>
            </div>
        );
    }
}
export default AddOrder;