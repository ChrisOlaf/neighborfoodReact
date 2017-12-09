import React, {Component} from 'react';

var time = undefined;

class Orders extends Component {

    constructor(props) {
        super(props)
        this.state = {
            content: '',
            order_id: '',
            isFormVisible: false,
            responses: []
        }
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.goAndFetchData();
    }

    goAndFetchData = () => {
        fetch('order/'+this.props.info.id+'/responses')
            .then(function (response) {
                return response.json();
            })
            .then((function (jsonobject) {
                this.setState({responses: jsonobject});
            }).bind(this));

    }

    handleClick() {
        console.log("ORDER isFormVisible " + this.state.isFormVisible);
        this.setState({
            isFormVisible: true
        });
    };

    handleSendForm = (e) => {
        e.preventDefault();
        this.addResponse(e);

    };

    addResponse() {
        const responseItem = {
            content: this.state.content,
            responder: this.props.user
        }
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
        }).bind(this))


        this.setState({isFormVisible: false})
    };

    changetime = () => {
        var o = this.props.info.createDate;
        var a = new Date(o);
        var months = ['1','2','3','4','5','6','7','8','9','10','11','12'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        time = date + '.' + month + '.' + year + ' ' + hour + ':' + min + ':' + sec ;
        return time;
    }

    render() {
        let form = null;
        var responses = this.state.responses.map(function (response) {
            return (
                <div key={response.id}>
                    {response.content}<br/>{response.responder.name}
                </div>
            )
        })
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
        if (this.props.auth === true) {
            responseButton = <button onClick={this.handleClick}>Vastaa tilaukseen</button>
        }
        return (
            <div>
                <p>Ilmoitus jätetty: {this.changetime()}</p>
                <p>Ilmoituksen tiedot: {this.props.info.content}</p>
                <p>Käyttäjä: {this.props.info.user.name}</p>
                <h4>Tarjoukset</h4>
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