import React, {Component} from 'react';
import {Glyphicon} from 'react-bootstrap';

var cachedUser;
var content;
var starsrev;
const Star = (props) => {
    if (props.rev < 1 || props.rev > 5) {
        return (
            <span className="review-stars-x">
            <Glyphicon glyph="fire"/>
            </span>
        )
    }
    if (props.rev === 1) {
        return (
            <span className="review-stars-1">
            <Glyphicon glyph="star"/>
            </span>
        )
    }
    if (props.rev === 2) {
        return (
            <span className="review-stars-2">
            <Glyphicon glyph="star"/>
            <Glyphicon glyph="star"/>
            </span>
        )
    }
    if (props.rev === 3) {
        return (
            <span className="review-stars-3">
            <Glyphicon glyph="star"/>
            <Glyphicon glyph="star"/>
            <Glyphicon glyph="star"/>
            </span>
        )
    }
    if (props.rev === 4) {
        return (
            <span className="review-stars-4">
            <Glyphicon glyph="star"/>
            <Glyphicon glyph="star"/>
            <Glyphicon glyph="star"/>
            <Glyphicon glyph="star"/>
            </span>
        )
    }
    if (props.rev === 5) {
        return (
            <span className="review-stars-5">
            <Glyphicon glyph="star"/>
            <Glyphicon glyph="star"/>
            <Glyphicon glyph="star"/>
            <Glyphicon glyph="star"/>
            <Glyphicon glyph="star"/>
            </span>
        )
    }
    return (
        <span className="review-stars-x">
            <Glyphicon glyph="fire"/>
            </span>
    )
}

class User extends Component {
    state = {
        user: '', data: '', reviews: [],
        review: {content: '', stars: '', whiter: '', target: ''}
    };

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
    componentDidMount = () => {
        cachedUser = window.sessionStorage.getItem('storedUser');
        const x = this;
        if (cachedUser) {
            var user = JSON.parse(cachedUser);
            x.setState({user: user});
            console.log("Haki käyttäjän storagesta!");
        }
        else {
            console.log("Käyttäjää ei löytynyt storagesta..?");
        }
        this.getUser();
    };

    handleContentChange = (e) => {
        content = e.target.value;
        this.setState({review:{content: content, writer: this.state.user, target:this.state.data, stars:starsrev}});
        // this.state.review.content = e.target.value;
        // this.state.review.writer = this.state.user;
        // this.state.review.target = this.state.data;
    };

    handleStarChange = (e) => {
        starsrev = e.target.value;
        this.setState({review:{content: content, writer: this.state.user, target:this.state.data, stars:starsrev}});
    };

    addReview = (e) => {
        e.preventDefault();
        console.log("tämä on lähdössä");
        console.dir(this.state.review);
        var x = this;
        if(this.state.review.content.length>1){
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
                x.getReviews();
            })
            .catch(function (res) {
                console.log(res)
            })
        }
    };

    getReviews() {
        console.log("get reviews...")
        fetch(this.props.match.params.id + '/reviews')
            .then(function (response) {
                return response.json();
            })
            .then((function (jsonobject) {
                this.setState({reviews: jsonobject});
                console.log("get reviews then...")
            }).bind(this));
        content = '';
        starsrev = '';
        this.setState({review:{content: content, writer: this.state.user, target:this.state.data, stars:starsrev}})
    }


    render() {
        var reviews = this.state.reviews.map(function (rev) {
            return (
                <span key={rev.id}>
                    <p>{rev.content}</p>
                    <p><Star rev={rev.stars}/></p>
                </span>
            )
        })
        if (!cachedUser) {
            return (
                <div>
                    <h1>Kirjaudu sisään nähdäksesi käyttäjien tiedot</h1>
                </div>
            )
        }else{
        return (
            <div className="register-content">
                <h1>Tietoja käyttäjästä {this.state.data.name} </h1>
                <p> {this.state.data.presentation}</p>
                <p> Alue: {this.state.data.location}</p>
                <p> Rooli: {this.state.data.userStatus}</p>

                <div>
                    <h2>Arviot</h2>
                    <p>{this.state.data.name} on saanut seuraavat arviot:</p>
                    <div>{reviews}</div>
                </div>
                {this.state.user.name===this.state.data.name?(<p>Et voi lisätä itsellesi arvostelua</p>):(<div>
                    <h2>Lisää arvostelu</h2>
                    <form>Arvioi asiointisi {this.state.data.name}n kanssa:<br />
                        <input type="text" name="content" value={this.state.review.content.value}
                               onChange={this.handleContentChange}/><br/>
                        Tähtiä 1-5: <br />
                        <input type="number" min="1" max="5" name="stars"
                               value={this.state.review.stars.value} onChange={this.handleStarChange}/><br />
                        <input type="submit" value="Lisää arvio" onClick={this.addReview}/>
                    </form>
                </div>)}
            </div>
        );
        }
    }
}

export default User;
