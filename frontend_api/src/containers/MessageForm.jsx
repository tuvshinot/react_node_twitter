import React, { Component } from 'react';
import {connect} from 'react-redux';
import {postNewMessage} from '../store/actions/messages';

class MessageForm extends Component {
    state = {
        messages : '',
        isValid : false,
        counting : 0
    }

    handlerNewMessage = e => {
        e.preventDefault();
        this.props.postNewMessage(this.state.messages);
        if(!this.props.errors.message) {
            this.props.history.push('/');
        }
    }

    inputChangeHandler = (e) => {
        this.setState({ messages : e.target.value, counting : e.target.value.length });
        this.checkValidity(e.target.value);
    }

    checkValidity = (value) => {
        if(value.length > 0) {
            this.setState((prevState, PrevProps) => {
                return { isValid : true}
            });
        } 
        if(value.length === 0) {
            this.setState((prevState, PrevProps) => {
                return { isValid : false}
            });
        }
    }

    render() {
        return (
            <form onSubmit={this.handlerNewMessage}>
                {this.props.errors.message && <div className="alert alert-danger">{this.props.errors.message}</div>}
                <span>{this.state.counting} / 250</span>
                <textarea className="form-control" maxLength="250" id="form-control" rows="3" cols="10"
                    value={this.state.messages}
                    onChange={this.inputChangeHandler}
                />
                <button type="submit" className="btn btn-success pull-right" disabled={this.state.isValid ? false : true}>
                    Add my message!
                </button>
            </form>
        );
    }
}

const mapStateToProps = state => {
    return {
        errors : state.errors
    }
};

export default connect(mapStateToProps, { postNewMessage })(MessageForm);