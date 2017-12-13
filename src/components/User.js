import React, {Component} from 'react';
var cachedUser;

class User extends Component {
    state = {user: '', data: '', reviews:[],
                review:{content:'',stars:'',whiter:'',target:''}};

    getUser() {
        fetch(this.props.match.params.id)
            .then(function (response) {
                return response.json();
            })
            .then((function (jsonobject) {
                this.setState({data: jsonobject});
                this.getReviews()
            }).bind(this));
        this.getReviews();
    }

    getReviews() {
        console.log("get reviews...")
        fetch(this.props.match.params.id+'/reviews')
            .then(function (response) {
                return response.json();
            })
            .then((function (jsonobject) {
                this.setState({reviews: jsonobject});

                console.log("get reviews then...")
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
        e.preventDefault();
        console.log("tämä on lähdössä");
        console.dir(this.state.review);
        fetch('/addreview',
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(this.state.review)
            })
            .then(function (res) {
                console.log(res);
            })
            .catch(function (res) {
                console.log(res)
            })
    };

    handleContentChange = (e) =>{
     this.state.review.content = e.target.value;
     this.state.review.writer = this.state.user;
     this.state.review.target = this.state.data;
    };

    handleStarChange = (e) => {
        this.state.review.stars = e.target.value;
    };

    render() {
        var reviews = this.state.reviews.map(function (rev) {
             return (
                    <div key={rev.id}>
                        {rev.content}
                    </div>
                )
        })
        if(reviews === undefined){
            return (
                <div>
                    <p>review undefined</p>
                </div>
            )
        }
        return (
            <div>
                <h1>Kirjautuneen käyttäjän nimi:{this.state.user.name}</h1>
                <h1> haettu käyttäjä: {this.state.data.name}</h1>
                <h1>ID: {this.state.data.id}</h1>
                <div>
                    <p>Reviews</p>
                    <p>Tähän tulee saadut arvostelut</p>
                    <p>{reviews}</p>
                </div>
                <div>
                    <h1>Lisää arvostelu</h1>
                    <form>Arvostelu:
                        <input type="text" name="content" value={this.state.review.content.value} onChange={this.handleContentChange}/><br/>
                        Tähtiä 1-5: <input type="number" min="1" max="5" name="stars" value={this.state.review.stars.value} onChange={this.handleStarChange}/>
                        <input type="submit" onClick={this.addReview}/>
                    </form>
                </div>
            </div>
        );
    }
}

export default User;
