import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Chef extends Component {
    render() {
        if (this.props.user === undefined || this.props.user === null) {
            return (
                <div>
                    <p>this.props.kokki.name}</p>
                    <p>{this.props.kokki.lastName}</p>
                    <p>{this.props.kokki.location}</p>
                </div>
            )
        }
        else {
            return (
                <div>
                    {this.props.location === this.props.kokki.location ?
                        (<span>
                <p><Link to={'/user/' + this.props.kokki.id}>{this.props.kokki.name}</Link></p>
                <p>{this.props.kokki.lastName}</p>
                <p>{this.props.kokki.location}</p>
                <hr/>
            </span>) : (<p></p>)}
                </div>
            );
        }

    }
}

export default Chef
