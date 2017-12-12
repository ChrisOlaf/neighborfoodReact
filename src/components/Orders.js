import React, {Component} from 'react';
import AcceptResponse from "./AcceptResponse";

var time = undefined;

class Orders extends Component {

    constructor(props) {
        super(props);
        this.state = {
            content: '',
            order_id: '',
            isFormVisible: false,
            responses: [],
            requirements: []
        };
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.goAndFetchData();
        this.getRequirements();
    }
    // Fetches responses for an order using order id
    goAndFetchData = () => {
        fetch('order/'+this.props.info.id+'/responses')
            .then(function (response) {
                return response.json();
            })
            .then((function (jsonobject) {
                this.setState({responses: jsonobject});
            }).bind(this));

    };
    // Fetches requirement for an order using order id
    getRequirements = () => {
        fetch('order/'+this.props.info.id+'/requirements')
            .then(function (requirement) {
                return requirement.json();
            })
            .then((function (jsonobject) {
                this.setState({requirements: jsonobject});
            }).bind(this));

    };

    // shows the response form when user presses the button "Lähetä"
    handleClick() {
        this.setState({
            isFormVisible: true
        });
    };

    handleSendForm = (e) => {
        e.preventDefault();
        this.addResponse(e);

    };
    // adds users response to the database
    addResponse() {
        const responseItem = {
            content: this.state.content,
            responder: this.props.user
        };
        fetch('order/'+this.props.info.id+'/responses',
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(responseItem)
            }).then((function (response) {
            this.goAndFetchData();
        }).bind(this));

        // Hides the form after sending
        this.setState({isFormVisible: false})
    };

    // Timestamp formating
    changeTime = (e) => {
        var a = new Date(e);
        var months = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        time = date + '.' + month + '.' + year + ' ' + hour + ':' + min + ':' + sec;
        return time;
    };

    render() {
        let form = null;
        // Searching for the requirement text
        var requirements = this.state.requirements.map(function (requirement) {
            return (
                <div key={requirement.id}>
                    {requirement.requirement}
                </div>
            )
        }, this);

        // Searching for timestamp, content and writer for a response.
        // A button to accept the response appears when the order is made by the user who is logged in.
        var responses = this.state.responses.map(function (response) {
            return (
                <div key={response.id}>
                    <p>Vastaus jätetty: {this.changeTime(response.createDate)} </p>
                    <p>Vastauksen sisältö: {response.content}</p>
                    <p>Lähettäjä: {response.responder.name}</p>
                    {this.props.user.id === this.props.info.user.id ? <AcceptResponse responder={response.responder}/> : null}
                </div>
            )
        }, this);

        //If the user has pressed the button "Vastaa ilmoitukseen", isFormVisible is true and the response form is visible
        if (this.state.isFormVisible) {
            form =
                <form>
                    <textarea type="text"
                              placeholder="Teksti"
                              value={this.state.content}
                              onChange={e => this.setState({content: e.target.value})}
                              cols="50"
                              rows="10"/>
                    <br/>

                    <input type="submit"
                           value="Lähetä"
                           onClick={e => this.handleSendForm(e)}/>
                    <button onClick={() => this.setState({isFormVisible: false})}>Sulje</button>
                </form>;
        }
        let responseButton = null;
        // Checks if the user has logged in. If yes, shows the button so that the user can send a message.
        // If the user hasn't logged in, the button is not visible.
        if (this.props.auth === true) {
            responseButton = <button onClick={this.handleClick}>Vastaa tilaukseen</button>
        }
        return (
            //Shows information about the order (including requirements and responses).
            <div>
                <p>Ilmoitus jätetty: {this.changeTime(this.props.info.createDate)}</p>
                <p>Ilmoituksen otsikko: {this.props.info.title}</p>
                <p>Ilmoituksen tiedot: {this.props.info.content}</p>
                Erityisvaatimukset: {requirements}
                <p>Käyttäjä: {this.props.info.user.name}</p>
                <h4>Vastaukset</h4>
                {responses}
                {responseButton}
                <br/>
                <div>
                    {form}
                </div>
            </div>
        );
    }
}

export default Orders;