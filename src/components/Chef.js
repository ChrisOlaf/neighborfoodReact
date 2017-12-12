import React, {Component} from 'react';


class Chef extends Component {
    render() {
        return (
            <span>
                <p>{this.props.kokki.name}</p>
                <p>{this.props.kokki.lastName}</p>
                <p>{this.props.kokki.location}</p>
                <hr />
            </span>
        );
    }
}

export default Chef
