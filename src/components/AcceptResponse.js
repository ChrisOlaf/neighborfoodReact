import React, {Component} from 'react';

class AcceptResponse extends Component {
    state = {
        isContactInfoVisible: false,
        isAcceptButtonVisible: true
    };

    handleClick = () => {
        this.setState({isContactInfoVisible: true, isAcceptButtonVisible: false});
    };

    render() {
        let acceptButton = null;
        if (this.state.isAcceptButtonVisible) {
            acceptButton = <button onClick={this.handleClick}>Hyväksy</button>;
        }
        let contactInfo = null;
        if (this.state.isContactInfoVisible) {
            contactInfo =
                <div>
                    Ota yhteyttä viestin lähettäneeseen henkilöön {this.props.responder.name}: <br/>
                    Puh: {this.props.responder.phoneNumber} <br/>
                    Sähköposti: {this.props.responder.email}
                </div>;
        }
        return (
            <div>
                {acceptButton}
                {contactInfo}
            </div>
        );
    }
}

export default AcceptResponse;