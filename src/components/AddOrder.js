import React, {Component} from 'react';

class AddOrder extends Component {
    state = {orders: {content: '', user:{id:'1'}, requirements:[]}};


    handleInput = (e) => {
        this.setState({
            [this.state.orders.content] : e.target.value
        });
    };

    addRequirement = (e) => {
        this.state.orders.requirements.push(e.target.value);
    };

    addOrder = () => {
        fetch('addorder')
    }


    render () {
        return(
            <div>
            <form>
                <input type="textarea" placeholder="Tilaus" name="content" value={this.state.value} onChange={this.handleInput}/><br/>
                <input type="checkbox" name="requirements" value="gluteeniton." onChange={this.addRequirement} />gluteeniton<br/>
                <input type="checkbox" name="requirements" value="laktoositon." onChange={this.addRequirement}/>laktoositon<br/>
                <input type="checkbox" name="requirements" value="maidoton." onChange={this.addRequirement} />maidoton<br/>
                <input type="checkbox" name="requirements" value="viljaton." onChange={this.addRequirement}/>viljaton<br/>
                <input type="checkbox" name="requirements" value="vegaani." onChange={this.addRequirement}/>vegaani<br/>
                <input type="submit" onSubmit={this.addOrder} value="Lisää tilaus"/>
            </form>
                <p>Tähän pitäisi tulla tulokset:</p>
                <p>sisältö: {this.state.orders.content}</p>
                <p>reqs: {this.state.orders.requirements}</p>
            </div>
        );
    }
}
export default AddOrder;