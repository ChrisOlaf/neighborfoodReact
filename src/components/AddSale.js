import React, {Component} from 'react';
import Orderlist from './Orderlist';
import '../App.css';

//Contains userinformation from Sessionstorage

var cachedUser;

//this component lets user(if logged in) to add a Sale.
// When form is submitted, adds the sale to a database and then asks if user wants to add more sales.

class AddSale extends Component {
    state = {
        sale: {content: '', user: {}, requirements: [{requirement: ''}]},
        saleAdded: false
    };

    //looks for the logged in user from sessionStorage. If not found,
    // puts it in the cachedUser variable
    componentDidMount = () => {
        cachedUser = window.sessionStorage.getItem('storedUser');
        const x = this;
        if (cachedUser) {
            var user = JSON.parse(cachedUser);
            x.setState({
                sale: {content: '', user: user, requirements: [{}]}
            });
            console.log("Haki käyttäjän storagesta!");
        }
        else {
            console.log("Käyttäjää ei löytynyt storagesta..?");
        }
    };
    //TODO otsikon lisäys
    //Handles the form text inputs
    handleInput = (e) => {
        this.state.sale.content = e.target.value;
    };

    //Adds requirement to the requirement array when selected
    addRequirement = (e) => {
        this.state.sale.requirements.push({requirement: e.target.value});
    };

    //TODO -> Method that adds extra requirement to the array

    // addxtrReq = (e) =>{
    //     this.state.sale.requirements.push({requirement: e.target.value});
    // }

    //Adds sale(in state) to the database
    // then clears the state and changes the state to saleAdded state.
    addSale = (e) => {
        console.log("Tätä yritetään lähettää");
        console.dir(this.state.sale);
        e.preventDefault();
        fetch('addsale',
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(this.state.sale)
            })
            .then(function (res) {
                console.log(res);
            })
            .catch(function (res) {
                console.log(res)
            })
        var kja = this.state.sale.user;
        this.setState({
            sale: {content: '', user: kja, requirements: []},
            saleAdded: true
        });
    };

    //Changes the state to saleAdded : false, if user wants to
    //add a new sale
    changeSaleAdded = () => {
        console.log("Täällä ollaan");
        this.setState({
            orders: {content: '', user: {id: ''}, requirements: []},
            saleAdded: false
        })
    };

    //Shows to a user who's logged in a Sale -form,
    // if not logged in, doesn't show a form
    render() {
        if (this.state.saleAdded) {
            return (
                <div>
                    <h2>Myynti-ilmoitus on nyt lisätty!</h2>
                    <button onClick={this.changeSaleAdded}>Lisää uusi ilmoitus</button>
                    <br/>
                    {/*<button>Palaa etusivulle</button>*/}
                </div>
            )

        } else {
            if (cachedUser) {
                return (
                    <div>
                        <h1>Lisää myynti-ilmoitus</h1>
                        <h2>ohjeet:</h2>
                        <ul>
                            <li>Mitä ruokaa valmistat?</li>
                            <li>Mitä raaka-aineita käytät?</li>
                            <li>Milloin ruoka haettavissa?</li>
                            <li>hintapyyntö</li>
                        </ul>

                        <form>
                        <textarea rows="5" cols="50" name="content" value={this.state.sale.content.value}
                                  onChange={e => this.handleInput(e)}/><br/>
                            <input type="checkbox" name="requirements" value="gluteeniton"
                                   onChange={this.addRequirement}/>gluteeniton<br/>
                            <input type="checkbox" name="requirements" value="laktoositon"
                                   onChange={this.addRequirement}/>laktoositon<br/>
                            <input type="checkbox" name="requirements" value="maidoton" onChange={this.addRequirement}/>maidoton<br/>
                            <input type="checkbox" name="requirements" value="viljaton" onChange={this.addRequirement}/>viljaton<br/>
                            <input type="checkbox" name="requirements" value="vegaani" onChange={this.addRequirement}/>vegaani<br/>
                            {/*<input defaultValue="joku muu, mikä?" type="text" name="requirements" value={this.state.sale.requirements.requirement} onChange={e => this.addxtrReq(e)}/><br/>*/}
                            <input type="submit" onClick={e => this.addSale(e)} value="Lisää ilmoitus"/>
                        </form>
                    </div>
                );
            }
            else {
                return (
                    <div>
                        <h1>Kirjaudu sisään lisätäksesi myynnin</h1>
                    </div>
                )
            }
        }
    }
}

export default AddSale;