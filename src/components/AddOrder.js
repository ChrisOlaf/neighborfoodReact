import React, {Component} from 'react';
var cachedUser;
class AddOrder extends Component {
    state = {orders: {content: '', user: {}, requirements: [{requirement: ''}]},
                orderAdded: false};

    componentDidMount = () => {
        cachedUser = window.sessionStorage.getItem('storedUser');
        const x = this;
        if (cachedUser) {
            var user = JSON.parse(cachedUser);
            x.setState({orders: {content: '', user: user, requirements: [{}]}});

            console.log("Haki käyttäjän storagesta!");
        }
        else {
            console.log("Käyttäjää ei löytynyt storagesta..?");
            this.addMessage();
        }
    };

    handleInput = (e) => {
        this.state.orders.content = e.target.value;
    };

    addRequirement = (e) => {
        this.state.orders.requirements.push({requirement: e.target.value});
    };

    //
    // addxtrReq = (e) =>{
    //     this.state.orders.requirements.push({requirement: e.target.value});
    // }

    addMessage = () => {
        "Käyttäjää ei löytynyt"
    }
    addOrder = (e) => {
        var x = this;
        console.log("Tätä yritetään lähettää" + this.state.orders);
        e.preventDefault();
        fetch('addorderwithreqs',
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(this.state.orders)
            })
            .then(function (res) {
                console.log(res)
                x.setState({orders: {content: '', user: {id: ''}, requirements: []},
                    orderAdded: true});
                x.render();
            })
            .catch(function (res) {
                console.log(res)
            })
    };

    changeorderAdded = () =>{
        console.log("Täällä ollaan");
        this.setState({orders: {content: '', user: {id: ''}, requirements: []},
            orderAdded: false})
    };

    render() {
        if (this.state.orderAdded) {
            return (
                <div>
                    <h2>Tilauksesi on nyt lisätty!</h2>
                    <button onClick={this.changeorderAdded}>Lisää uusi tilaus</button> <br />
                    {/*<button>Palaa etusivulle</button>*/}
                </div>
            )
        }
        else {
            if (cachedUser) {
                return (
                    <div>
                        <h1>Lisää tilaus</h1>
                        <h2>ohjeet:</h2>
                        <ul>
                            <li>Mitä ruokaa haluat syödä?</li>
                            <li>milloin haluat syödä?</li>
                            <li>noudatko itse vai kotiinkuljetus?</li>
                            <li>hintahintahaarukka</li>
                        </ul>
                        <form>
                            <textarea rows="4" cols="50" name="content" value={this.state.orders.content.value}
                                      onChange={e => this.handleInput(e)}/><br/>
                            <input type="checkbox" name="requirements" value="gluteeniton"
                                   onChange={this.addRequirement}/>gluteeniton<br/>
                            <input type="checkbox" name="requirements" value="laktoositon"
                                   onChange={this.addRequirement}/>laktoositon<br/>
                            <input type="checkbox" name="requirements" value="maidoton" onChange={this.addRequirement}/>maidoton<br/>
                            <input type="checkbox" name="requirements" value="viljaton" onChange={this.addRequirement}/>viljaton<br/>
                            <input type="checkbox" name="requirements" value="vegaani" onChange={this.addRequirement}/>vegaani<br/>
                            {/*<input defaultValue="joku muu, mikä?" type="text" name="requirements" value={this.state.orders.requirements.requirement} onChange={e => this.addxtrReq(e)}/><br/>*/}
                            <input type="submit" onClick={e => this.addOrder(e)} value="Lisää tilaus"/>
                        </form>
                    </div>
                );
            } else {
                return (
                    <div>
                        <h1>Kirjaudu sisään lisätäksesi tilauksen</h1>
                    </div>
                )
            }
        }
    }
}

export default AddOrder;