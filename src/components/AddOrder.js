import React, {Component} from 'react';
var cachedUser;
class AddOrder extends Component {
    state = {orders: {content: '', user:{}, requirements:[]}};

    componentDidMount = () =>{
        cachedUser = window.sessionStorage.getItem('storedUser');
        const x = this;
        if (cachedUser) {
            this.setState(x.state.orders = {user: JSON.parse(cachedUser)});
            // x.state = ({auth: true});
            console.log(cachedUser);
            console.log("Haki käyttäjän storagesta!");
            return(this.state.orders.user);
        }
        else {
            console.log("Käyttäjää ei löytynyt storagesta..?");
            this.addMessage();
        }
    };

    handleInput = (e) => {
        this.setState({
            [this.state.orders.content] : e.target.value
        });
    };

    addRequirement = (e) => {
        this.state.orders.requirements.push(e.target.value);
    };

    addxtrReq = (e) =>{
        this.state.orders.requirements.push(e.target.value);
    }

    addMessage = () => {
        "Käyttäjää ei löytynyt"
    }
    addOrder = (e) => {
        e.preventDefault()
        fetch('addorder',
        {
            headers: {
                'Accept': 'application/json',
                    'Content-Type': 'application/json'
            },
            method: "POST",
                body: JSON.stringify(this.state.orders)
        })
        .then(function(res){ console.log(res) })
        .catch(function(res){ console.log(res) })

        this.setState({orders: {content: '', user:{id:'1'}, requirements:[]}})
    };



    render () {
        if(cachedUser){
        return(
            <div>
                <h1>{this.componentDidMount}</h1>
            <form>
                <input type="textarea" placeholder="Tilaus" name="content" value={this.state.value} onChange={this.handleInput}/><br/>
                <input type="checkbox" name="requirements" value="gluteeniton" onChange={this.addRequirement} />gluteeniton<br/>
                <input type="checkbox" name="requirements" value="laktoositon" onChange={this.addRequirement}/>laktoositon<br/>
                <input type="checkbox" name="requirements" value="maidoton" onChange={this.addRequirement} />maidoton<br/>
                <input type="checkbox" name="requirements" value="viljaton" onChange={this.addRequirement}/>viljaton<br/>
                <input type="checkbox" name="requirements" value="vegaani" onChange={this.addRequirement}/>vegaani<br/>
                Joku muu, mikä?<input type="text" name="requirements" value={this.state.value} onChange={this.addxtrReq}/><br/>
                <input type="submit" onSubmit={this.addOrder} value="Lisää tilaus"/>
            </form>
                <p>Tähän pitäisi tulla tulokset:</p>
                <p>sisältö: {this.state.orders.content}</p>
                <p>reqs: {this.state.orders.requirements}</p>
            </div>
        );
    }
    else {
            return (
                <div>
                    <h1>Kirjaudu sisään lisätäksesi tilauksen</h1>
                </div>
            )
        }
    }
}
export default AddOrder;