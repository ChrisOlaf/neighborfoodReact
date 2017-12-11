import React, {Component} from 'react';
import AddSale, {Added} from './AddSale'
//Contains userinformation from Sessionstorage
var cachedUser;
var requirs='';
//this component lets user(if logged in) to add an order.
// When form is submitted, adds the order to a database and then asks if user wants to add more orders.
class AddOrder extends Component {

    state = {
        orders: {title: '', content: '', user: {}, requirements: [{requirement: ''}]},
        orderAdded: false,
        reqs: ''

    };

    //looks for the logged in user from sessionStorage. If found,
    // puts it in the cachedUser variable
    componentDidMount = () => {
        cachedUser = window.sessionStorage.getItem('storedUser');
        const x = this;
        if (cachedUser) {
            var user = JSON.parse(cachedUser);
            x.setState({orders: {title: '', content: '', user: user, requirements: [{}]}});
            console.log("Haki käyttäjän storagesta!");
        }
        else {
            console.log("Käyttäjää ei löytynyt storagesta..?");
        }
    };

    handleTitleInput = (e) =>{
        this.state.orders.title = e.target.value;
    };
    handleContentInput = (e) => {
        this.state.orders.content = e.target.value;
    };

    //Adds requirement to the requirement array when selected
    addRequirement = (e) => {
        this.state.orders.requirements.push({requirement: e.target.value});
    };

    //TODO -> Method that adds extra requirement to the array
    //
    // addxtrReq = (e) =>{
    //     this.state.orders.requirements.push({requirement: e.target.value});
    // }

    //Adds order (in state) to the database
    // then clears the state and changes the state to Orderadded state.
    addOrder = (e) => {
        var x = this;
        console.log("Tätä yritetään lähettää");
        console.dir(this.state.orders);
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
                var joku = x.state.orders.user;
                x.setState({
                    orders: {title: '', content: '', user: joku, requirements: []},
                    orderAdded: true
                });
            })
            .catch(function (res) {
                console.log(res)
            })
    };


   //Changes the state to orderAdded : false, if user wants to
    //add a new order
    changeorderAdded = () => {
        console.log("Täällä ollaan");
        var ok = this.state.orders.user;
        this.setState({
            orders: {title: '', content: '', user: ok, requirements: []},
            orderAdded: false,
            reqs: ''
        })
    };

    addRmt = (e) => {
        this.setState(
            {reqs: e.target.value}
        );
    };

    addRqrmt = (e) => {
        e.preventDefault();
        requirs = requirs+ this.state.reqs +'\n';
        this.state.orders.requirements.push({requirement: this.state.reqs});
        this.setState({reqs: ''});
        console.dir(this.state.orders.requirements);
        console.dir(requirs);
    };


    //Shows to a user who's logged in a Order -form, if not logged in, doesn't show a form
    render() {
        if (this.state.orderAdded) {
            return (
                <div>
                    <h2>Tilauksesi on nyt lisätty!</h2>
                    <button onClick={this.changeorderAdded}>Lisää uusi tilaus</button>
                    <br/>
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
                            <input type="text" name="title" value={this.state.orders.title.value}
                                   onChange={e => this.handleTitleInput(e)}/><br />
                            <textarea rows="4" cols="50" name="content" value={this.state.orders.content.value}
                                      onChange={e => this.handleContentInput(e)}/><br/>
                            <input type="checkbox" name="requirements" value="gluteeniton"
                                   onChange={this.addRequirement}/>gluteeniton<br/>
                            <input type="checkbox" name="requirements" value="laktoositon"
                                   onChange={this.addRequirement}/>laktoositon<br/>
                            <input type="checkbox" name="requirements" value="maidoton" onChange={this.addRequirement}/>maidoton<br/>
                            <input type="checkbox" name="requirements" value="viljaton" onChange={this.addRequirement}/>viljaton<br/>
                            <input type="checkbox" name="requirements" value="vegaani" onChange={this.addRequirement}/>vegaani<br/>
                            <div>{requirs !== undefined && requirs.length > 2 ? <Added callback={this.addRequirement} regus={requirs}/> : ''}</div>
                            <input defaultValue="joku muu, mikä?" type="text" name="requirements"
                                   onChange={this.addRmt}/>
                            <button onClick={e => this.addRqrmt(e)}>Lisää vaatimus</button>
                            <br/><br/>

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