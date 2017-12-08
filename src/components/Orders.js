import React, {Component} from 'react';

class Orders extends Component {

    constructor() {
        super()
        this.state = {
            content: '',
            order_id: '',
            isFormVisible: false,
        }
        this.handleClick = this.handleClick.bind(this);
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
            order_id: this.props.info.id
        }
        fetch('addresponse',
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(responseItem)
            })


        this.setState({isFormVisible: false})

    };

    render() {
        let form = null;
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
                <p>Ilmoitus jätetty: {this.props.info.createDate}</p>
                <p>Ilmoituksen tiedot: {this.props.info.content}</p>
                <p>Käyttäjä: {this.props.info.user.name}</p>
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