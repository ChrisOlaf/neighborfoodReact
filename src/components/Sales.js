import React, {Component} from 'react';
var time = undefined;
class Sales extends Component {

    constructor(props) {
        super(props)
        this.state = {
            content: '',
            order_id: '',
            isFormVisible: false,
            responses: []
        }
    }
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
    };
    render () {
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
        return(
            <div>
                <p>Ilmoitus jätetty: {this.changetime()}</p>
                <p>Ilmoituksen sisältö: {this.props.info.content}</p>
                {/*<p>Käyttäjä: {this.props.info.seller.name}</p>*/}
                <h4>Vastaukset</h4>
                {responseButton}
                <div>
                    {form}
                </div>
                <br/>
            </div>
        );
    }
}
export default Sales;