import React, {Component} from 'react';
var cachedUser;

class User extends Component {
    state = {user: '', data: '', review:{content:'', stars: ''}};

    getUser() {
        fetch(this.props.match.params.id)
            .then(function (response) {
                return response.json();
            })
            .then((function (jsonobject) {
                this.setState({data: jsonobject});
            }).bind(this));
    }

    componentDidMount = () => {
        cachedUser = window.sessionStorage.getItem('storedUser');
        const x = this;
        if (cachedUser) {
            var user = JSON.parse(cachedUser);
            x.setState({user:user});
            console.log("Haki käyttäjän storagesta!");
        }
        else {
            console.log("Käyttäjää ei löytynyt storagesta..?");
        }
        this.getUser();
    };

    addReview = (e) => {
        e.preventDefault()
    };
    render() {
        // var reviews = this.state.data.reviews.map(function (review) {
        //      return (
        //             <div key={review.id}>
        //                 {review.content}
        //             </div>
        //         )
        // })
        return (
            <div>
                <h1>Kirjautuneen käyttäjän nimi:{this.state.user.name}</h1>
                <h1> haettu käyttäjä: {this.state.data.name}</h1>
                <h1>ID: {this.state.data.id}</h1>
                <div>
                    <p>Reviews</p>
                    <p>Tähän tulee saadut arvostelut</p>
                </div>
                <div>
                    <h1>Lisää arvostelu</h1>
                    <form>Arvostelu:
                        <input type="text" name="content" value={this.state.review.content.value}/><br/>
                        Tähtiä 1-5: <input type="number" min="1" max="5" name="stars" value={this.state.review.stars.value}/>
                        <input type="submit" onClick={this.addReview}/>
                    </form>
                </div>
            </div>
        );
    }
}

export default User;
