import React, {Component} from 'react';
import {Redirect} from 'react-router';
import {Added} from './AddSale'


//Contains userinformation from Sessionstorage
var cachedUser;
var requirs = '';
//this component lets user(if logged in) to add an order.
// When form is submitted, adds the order to a database and then asks if user wants to add more orders.
class AddOrder extends Component {

    state = {
        orders: {title: '', content: '', user: {}, requirements: []},
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
            x.setState({orders: {title: '', content: '', user: user, requirements: []}});
            console.log("Haki käyttäjän storagesta!");
        }
        else {
            console.log("Käyttäjää ei löytynyt storagesta..?");
        }
    };

    handleTitleInput = (e) => {
        this.state.orders.title = e.target.value;
    };
    handleContentInput = (e) => {
        this.state.orders.content = e.target.value;
    };

    //Adds requirement to the requirement array when selected
    addRequirement = (e) => {
        const itemToAdd = {requirement: e.target.value};
        let requirements = this.state.orders.requirements;
        if (requirements.length > 0) {
            if (this.listContainsItem(itemToAdd, requirements)) {
                requirements.splice(requirements.indexOf(itemToAdd),1)
            } else {
                requirements.push(itemToAdd);
            }
        } else {
            requirements.push(itemToAdd);
        }
    };

    listContainsItem = (item, list) => {
        for (let key in list){
            if (list[key].requirement === item.requirement){
                return true;
            }
        }
        return false;
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
        e.preventDefault();
        fetch('addorder',
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(this.state.orders)
            })
            .then(function (res) {
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
        requirs = requirs + this.state.reqs + '\n';
        this.setState({reqs: ''});
        console.dir(this.state.orders.requirements);
        console.dir(requirs);
    };


    //Shows to a user who's logged in a Order -form, if not logged in, doesn't show a form
    render() {
        if (this.state.orderAdded) {
            return (
                <div className="register-content">
                    <h2>Tilauksesi on nyt lisätty!</h2>
                    <button onClick={this.changeorderAdded}>Lisää uusi tilaus</button>
                    <br/>
                </div>
            )
        }
        else {
            if (this.props.auth) {
                return (
                    <div className="register-content">
                        <h1>Lisää tilaus</h1>
                        <h2>ohjeet:</h2>
                        <ul>
                            <li>Mitä ruokaa haluat syödä?</li>
                            <li>milloin haluat syödä?</li>
                            <li>noudatko itse vai kotiinkuljetus?</li>
                            <li>hintahaarukka</li>
                        </ul>
                        <form>
                            Otsikko: <br />
                            <input type="text" name="title" value={this.state.orders.title.value}
                                   onChange={e => this.handleTitleInput(e)}/><br/>
                            Sisältö: <br />
                            <textarea rows="4" cols="50" name="content" value={this.state.orders.content.value}
                                      onChange={e => this.handleContentInput(e)}/><br/>
                            <input type="checkbox" name="requirements" value="gluteeniton"
                                   onClick={this.addRequirement}/>gluteeniton<br/>
                            <input type="checkbox" name="requirements" value="laktoositon" onClick={this.addRequirement} />laktoositon<br/>
                            <input type="checkbox" name="requirements" value="maidoton" onClick={this.addRequirement}/>maidoton<br/>
                            <input type="checkbox" name="requirements" value="viljaton" onClick={this.addRequirement}/>viljaton<br/>
                            <input type="checkbox" name="requirements" value="vegaani"onClick={this.addRequirement}/>vegaani<br/>
                            <div>{requirs !== undefined && requirs.length > 2 ?
                                <Added callback={this.addRequirement} regus={requirs}/> : ''}</div>
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
                    <Redirect to='/login'/>
                )
            }
        }
    }
}

export default AddOrder;