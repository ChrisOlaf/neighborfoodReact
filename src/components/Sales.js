import React, {Component} from 'react';
var time = undefined;
class Sales extends Component {

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
    render () {
        return(
            <div>
                <p>Ilmoitus jätetty: {this.changetime()}</p>
                <p>Ilmoituksen sisältö: {this.props.info.content}</p>
                {/*<p>Käyttäjä: {this.props.info.seller.name}</p>*/}
                <br/>
            </div>
        );
    }
}
export default Sales;