import React, {Component} from 'react';
import '../App.css';

//Contains userinformation from Sessionstorage

var cachedUser;

//this component lets user(if logged in) to add a Sale.
// When form is submitted, adds the sale to a database and then asks if user wants to add more sales.
var requs ='';

export class Added extends Component {
    addReq = (e) =>{
        this.props.callback(e);
    };
    render() {
        var o = this.props.regus;
        var text = o.substring(0,o.length-1);
        return (
            <p>
                    {text.split("\n").map(i => {
                        return(
                        <div>
                            <input type="checkbox" key={i} name="requirements" value={i} onChange={this.addReq}/>{i}<br/>
                        </div>)
                            })}
            </p>);

        };
        // requirementin poistosta <p>  </p><button onClick={this.removeWord(i)}>x</button>
}

var titles ='';
var contents = '';
var user = '';

class AddSale extends Component {

    state = {
        sale: {title: '', content: '', user: {}, requirements: [{}]},
        saleAdded: false,
        reqs: ''
    };


    //looks for the logged in user from sessionStorage. If not found,
    // puts it in the cachedUser variable
    componentDidMount = () => {
        cachedUser = window.sessionStorage.getItem('storedUser');
        const x = this;
        if (cachedUser) {
            user = JSON.parse(cachedUser);
            x.setState({
                sale: {title: '', content: '', user: user, requirements: [{}]}
            });
            console.log("Haki käyttäjän storagesta!");
        }
        else {
            console.log("Käyttäjää ei löytynyt storagesta..?");
        }
    };
    //TODO otsikon lisäys
    //Handles the form title input
    handleTitleInput = (e) => {
        titles = e.target.value;
        this.setState({
            sale: {title: titles, content: contents, user: user, requirements: [{}]}
        });
    };
    //Handles the form text inputs
    handleContentInput = (e) => {
        contents = e.target.value;
        this.setState({
            sale: {title: titles, content: contents, user: user, requirements: [{}]}
        });
    };

    //Adds requirement to the requirement array when selected
    addRequirement = (e) => {
        let i = this.state.sale.requirements.length;
        while (i--) {
            if (this.state.sale.requirements[i] === {requirement: e.target.value}) {
                this.state.sale.requirements.splice(i,1);
            }
        }
        if(e.target.value.length>2){
            this.state.sale.requirements.push({requirement: e.target.value});
        }

    };

    addRmt = (e) => {
        this.setState(
            {reqs: e.target.value}
        );
    };

    //TODO -> Method that adds extra requirement to the array

    addRqrmt = (e) => {
        e.preventDefault();
        requs = requs+ this.state.reqs +'\n';
        // this.state.sale.requirements.push({requirement: this.state.reqs});
        this.setState({reqs: ''});
        // console.dir(this.state.sale.requirements);
        // console.dir(requs);
    };
    //
    // addWhenReady = (e) => {
    //     console.log("addwhenready...")
    //     console.dir(this.state);
    //     this.setState(
    //         {whenReady: e.target.value}
    //     )
    //     console.dir(this.state);
    // };

    //Adds sale(in state) to the database
    // then clears the state and changes the state to saleAdded state.
    addSale = (e) => {
        e.preventDefault();
        // this.setState(
        //     {whenReady: e.target.value.whenReady}
        // )
        console.log("Tätä yritetään lähettää");
        console.dir(this.state.sale);
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
            sale: {title: '', content: '', user: kja, requirements: []},
            saleAdded: true
        });
    };

    //Changes the state to saleAdded : false, if user wants to
    //add a new sale
    changeSaleAdded = () => {
        console.log("Täällä ollaan");
        var kja = this.state.sale.user;
        this.setState({
            sale: {title: '', content: '', user: kja, requirements: []},
            saleAdded: false
        });
    };
//Shows to a user who's logged in a Sale -form,
    // if not logged in, doesn't show a form
    render() {
        if (this.state.saleAdded) {
            return (
                <div className="register-content">
                    <h2>Myynti-ilmoitus on nyt lisätty!</h2>
                    <button onClick={this.changeSaleAdded}>Lisää uusi ilmoitus</button>
                    <br/>
                    {/*<button>Palaa etusivulle</button>*/}
                </div>
            )

        } else {
            if (cachedUser && this.props.auth) {
                return (
                    <div className="register-content">
                        <h1>Lisää myynti-ilmoitus</h1>
                        <h2>ohjeet:</h2>
                        <ul>
                            <li>Mitä ruokaa valmistat?</li>
                            <li>Mitä raaka-aineita käytät?</li>
                            <li>Milloin ruoka haettavissa?</li>
                            <li>hintapyyntö</li>
                        </ul>

                        <form>

                            Otsikko: <input type="text" name="title" value={this.state.sale.title.value}
                                            onChange={e => this.handleTitleInput(e)}/><br/>
                            Sisältö:
                            <textarea rows="5" cols="50" name="content" value={this.state.sale.content.value}
                                      onChange={e => this.handleContentInput(e)}/><br/>

                            <input type="checkbox" name="requirements" value="gluteeniton"
                                   onChange={this.addRequirement}/>gluteeniton<br/>
                            <input type="checkbox" name="requirements" value="laktoositon"
                                   onChange={this.addRequirement}/>laktoositon<br/>
                            <input type="checkbox" name="requirements" value="maidoton" onChange={this.addRequirement}/>maidoton<br/>
                            <input type="checkbox" name="requirements" value="viljaton" onChange={this.addRequirement}/>viljaton<br/>
                            <input type="checkbox" name="requirements" value="vegaani" onChange={this.addRequirement}/>vegaani<br/>
                            <div>{requs !== undefined && requs.length > 2 ? <Added callback={this.addRequirement} regus={requs}/> : ''}</div>

                            <input defaultValue="joku muu, mikä?" type="text" name="requirements"
                                   onChange={this.addRmt}/>
                            <button onClick={e => this.addRqrmt(e)}>Lisää vaatimus</button>
                            <br/><br/>
                            {/*Valitse päivä: <input type="date" name="whenReady" value={this.state.sale.whenReady.value} onChange={this.addWhenReady}/><br/>*/}
                            {/*<div>{requs != undefined && requs.length > 2 ? <Added/> : ''}</div>*/}

                            <input type="submit" onClick={e => this.addSale(e)} value="Lisää ilmoitus"/>
                        </form>
                    </div>
                );
            }
            else {
                return (
                    <div className="register-content">
                        <h1>Kirjaudu sisään lisätäksesi myynnin</h1>
                    </div>
                )
            }
        }
    }
}

export default AddSale;
