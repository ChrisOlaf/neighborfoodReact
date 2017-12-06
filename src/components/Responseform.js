import React, {Component} from 'react';

class Responseform extends Component {

    constructor(props) {
        super(props);
        this.state = {
            content: '',
            orders_id: props.orders_id
        };
    }

    handleClick = (e) => {
        e.preventDefault();
        this.addResponse(e);

    };

    addResponse() {
        console.log(JSON.stringify(this.state));
        fetch('addresponse',
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(this.state)
            })


        this.setState({content: ''})

    };

    render() {
        return (

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
                       onClick={e => this.handleClick(e)}/>
            </form>

        );

    }

}

export default Responseform;